using System.Globalization;
using System.Net;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Tron.Web.AppCode;

namespace Tron.Web
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //Compres response with GZipCompression
            services.AddResponseCompression();

            // Add framework services.
            services.AddMvc();

            services.AddAuthentication("cookietronauth").AddCookie("cookietronauth", options =>
            {
                options.LoginPath = new PathString("/Account/Login/");
                options.AccessDeniedPath = new PathString("/Account/Login/");
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = new System.TimeSpan(12, 0, 0);
            });

            //authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("LoggedIn",
                                  policy => policy.Requirements.Add(new CookieAuthorize()));
            });
            services.AddScoped<IAuthorizationHandler, CookieAuthorizeHandler>();

            //localization
            services.AddLocalization(opts => { opts.ResourcesPath = "Resources"; });
            services.Configure<RequestLocalizationOptions>(
            opts =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("bg")
                };

                opts.DefaultRequestCulture = new RequestCulture(culture: "bg", uiCulture: "bg");
                // Formatting numbers, dates, etc.
                opts.SupportedCultures = supportedCultures;
                // UI strings that we have localized.
                opts.SupportedUICultures = supportedCultures;
            });

            services.Configure<IISOptions>(options =>
            {
            });

            DependencyConfiguration dependencyConfiguration = new DependencyConfiguration();
            dependencyConfiguration.AddDependencies(services, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Error);

            app.UseCookiePolicy(new CookiePolicyOptions()
            {
                Secure = CookieSecurePolicy.None
            });

            app.UseResponseCompression();

            app.UseExceptionHandler(
                builder =>
                {
                    builder.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "text/html";

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            if (env.IsDevelopment())
                            {
                                loggerFactory.CreateLogger("FirstChanceException").LogError(new EventId(0), error.Error, $"Exception:{error.Error.Message}\n StackTrace: {error.Error.StackTrace}");
                                await context.Response.WriteAsync($"<h1>Error: {error.Error.Message}</h1><div><h2>Stack trace</h2>{error.Error.StackTrace}").ConfigureAwait(false);
                            }
                            else
                            {
                                await context.Response.WriteAsync($"<h1>Error occur</h1>").ConfigureAwait(false);
                            }
                        }
                    });
                }
            );

            app.UseStaticFiles();

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            //Authenthication
            app.UseAuthentication();

            app.UseWebSockets();
            this.HandleWebSockets(app);
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }


        public void HandleWebSockets(IApplicationBuilder app)
        {
            app.Use(async (http, next) =>
            {
                if (http.WebSockets.IsWebSocketRequest)
                {
                    var handler = app.ApplicationServices.GetService<IWebSocketHandler>();
                    WebSocket socket = await http.WebSockets.AcceptWebSocketAsync();
                    await handler.HandleWebSockets(socket, app.ApplicationServices);
                }
                else
                {
                    await next();
                }
            });
        }
    }
}