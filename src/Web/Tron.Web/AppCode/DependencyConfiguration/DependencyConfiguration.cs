using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tron.Core.Interfaces.Services;
using Tron.Core.Services;
using Tron.GameEngine;
using Tron.GameEngine.Factories;
using Tron.GameEngine.Interfaces.Factories;
using Tron.GameEngine.Interfaces.Objects;
using Tron.GameEngine.Interfaces.Services;

namespace Tron.Web.AppCode
{
    public class DependencyConfiguration
    {
        public void AddDependencies(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.Configure<GameEngineSettings>(configuration.GetSection("GameEngineSettings"));
            services.AddTransient<IWebSocketHandler, WebSocketHandler>();
            services.AddTransient<IUsersService, UserService>();
            services.AddSingleton<IGameService, GameService>();
            services.AddTransient<IGameCreationFactory, GameCreationFactory>();
        }
    }
}
