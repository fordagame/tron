declare var Handlebars: any;
declare var version: any;
declare var Chart: any;
namespace Tron {
    export declare var Resources: Array<Array<string>>;
    //Load DCor and all extensions to it
    export let app = dcore.createOne();
    let pagesConfig: PagesConfig;
    app.useRouting();
    app.useMVP();
    app.useMVPExtended();
    app.useServices();
    app.useAjax();
    app.useWebSocket();
    let cookies: CookieService = new CookieService();
    let language: string = cookies.getCookie(".AspNetCore.Culture");
    app.useLocalization(new ResourceLoader("/localization"), extractLanguage(language));

    app.useTemplateResolver(new dcore.plugins.templates.TemplateResolver(Handlebars.templates, function (name: string) { return name + ".html"; }));

    let dependencyResolvers: IConcreteDependencyResolver[] = [];
    dependencyResolvers[ResolverTypes.Resource] = new ResourceResolver();
    dependencyResolvers[ResolverTypes.Template] = new TemplateResolver();
    app.useDependencyLoader(dependencyResolvers);

    let dependencyService: DependencyService = new DependencyService(app.dependency);

    dependencyService.addResourceDepndency("application");
    dependencyService.loadTemplateDependency();
    dependencyService.executeDependencies(function (status: Boolean, errorMessage: string) {
        app.run(() => {
            app.routing
                .register('/games', routeParams => onRouteChanged("games", []))
                .register('/tron/{id}', routeParams => onRouteChanged("tron", { "gameId": routeParams.id }))
                .defaultUrl = "games";

            Resources = [];
            var moduleConfig = new ModulesConfig();
            moduleConfig.init(app);
            var serviceConfig = new ServiceConfig();
            serviceConfig.init(app);
            pagesConfig = new PagesConfig();
            pagesConfig.init(app);

            app.websocket.init("");
        });
    });

    function onRouteChanged(page: string, parameters: Object) {
        history.pushState(null, page, window.location.href);
        var container = document.getElementById("container");
        stopModules(container);

        container.innerHTML = pagesConfig.getContainerPageTemplate(page, parameters);
        startModules(container, parameters);
    }

    function startModules(container: HTMLElement, parameters: Object) {
        getModulesToStart(container).forEach(module => {
            let moduleType = module.dataset["module"];
            let moduleId = module.id;
            app.start(moduleType, { "root": module, "instanceId": moduleId, "parameters": parameters });
        });
    }

    function stopModules(container: HTMLElement) {
        getModulesToStart(container).forEach(module => {
            let moduleType = module.dataset["module"];
            let moduleId = module.id;
            app.stop(moduleType, moduleId);
        });
    }

    function getModulesToStart(container: HTMLElement): HTMLElement[] {
        let result = [];
        let modules = container.querySelectorAll('[data-module]');
        for (let i = 0, len = modules.length; i < len; i++) {
            result.push(<HTMLElement>modules[i]);
        }

        return result;
    }

    function extractLanguage(cookieLanguage: string) {
        if (!cookieLanguage) {
            return "bg";
        }
        var cookieLanguage = cookieLanguage.substr(4, 2);
        for (var i = 0; i < Tron.SupportedLanguages.supportedLanguages.length; i++) {
            var language = Tron.SupportedLanguages.supportedLanguages[i];
            if (language == cookieLanguage) {
                return cookieLanguage;
            }
        }
        return "bg";
    }
}
