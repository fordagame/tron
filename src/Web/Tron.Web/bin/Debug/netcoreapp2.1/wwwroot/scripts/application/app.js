var Tron;
(function (Tron) {
    //Load DCor and all extensions to it
    Tron.app = dcore.createOne();
    var pagesConfig;
    Tron.app.useRouting();
    Tron.app.useMVP();
    Tron.app.useMVPExtended();
    Tron.app.useServices();
    Tron.app.useAjax();
    Tron.app.useWebSocket();
    var cookies = new Tron.CookieService();
    var language = cookies.getCookie(".AspNetCore.Culture");
    Tron.app.useLocalization(new Tron.ResourceLoader("/localization"), extractLanguage(language));
    Tron.app.useTemplateResolver(new dcore.plugins.templates.TemplateResolver(Handlebars.templates, function (name) { return name + ".html"; }));
    var dependencyResolvers = [];
    dependencyResolvers[Tron.ResolverTypes.Resource] = new Tron.ResourceResolver();
    dependencyResolvers[Tron.ResolverTypes.Template] = new Tron.TemplateResolver();
    Tron.app.useDependencyLoader(dependencyResolvers);
    var dependencyService = new Tron.DependencyService(Tron.app.dependency);
    dependencyService.addResourceDepndency("application");
    dependencyService.loadTemplateDependency();
    dependencyService.executeDependencies(function (status, errorMessage) {
        Tron.app.run(function () {
            Tron.app.routing
                .register('/games', function (routeParams) { return onRouteChanged("games", []); })
                .register('/tron/{id}', function (routeParams) { return onRouteChanged("tron", { "gameId": routeParams.id }); })
                .defaultUrl = "games";
            Tron.Resources = [];
            var moduleConfig = new Tron.ModulesConfig();
            moduleConfig.init(Tron.app);
            var serviceConfig = new Tron.ServiceConfig();
            serviceConfig.init(Tron.app);
            pagesConfig = new Tron.PagesConfig();
            pagesConfig.init(Tron.app);
            Tron.app.websocket.init("");
        });
    });
    function onRouteChanged(page, parameters) {
        history.pushState(null, page, window.location.href);
        var container = document.getElementById("container");
        stopModules(container);
        container.innerHTML = pagesConfig.getContainerPageTemplate(page, parameters);
        startModules(container, parameters);
    }
    function startModules(container, parameters) {
        getModulesToStart(container).forEach(function (module) {
            var moduleType = module.dataset["module"];
            var moduleId = module.id;
            Tron.app.start(moduleType, { "root": module, "instanceId": moduleId, "parameters": parameters });
        });
    }
    function stopModules(container) {
        getModulesToStart(container).forEach(function (module) {
            var moduleType = module.dataset["module"];
            var moduleId = module.id;
            Tron.app.stop(moduleType, moduleId);
        });
    }
    function getModulesToStart(container) {
        var result = [];
        var modules = container.querySelectorAll('[data-module]');
        for (var i = 0, len = modules.length; i < len; i++) {
            result.push(modules[i]);
        }
        return result;
    }
    function extractLanguage(cookieLanguage) {
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
})(Tron || (Tron = {}));
//# sourceMappingURL=app.js.map