var Tron;
(function (Tron) {
    var ResourceLoader = /** @class */ (function () {
        function ResourceLoader(basePath) {
            this.basePath = basePath;
        }
        ResourceLoader.prototype.loadLanguageResource = function (resourceName, language, success) {
            Tron.app.ajax(this.basePath + "/" + resourceName + "." + language + ".js?ver=" + version, {
                method: "Get",
                success: function (result) {
                    eval(result);
                    success(resourceName, Tron.Resources[resourceName]);
                }
            });
        };
        return ResourceLoader;
    }());
    Tron.ResourceLoader = ResourceLoader;
})(Tron || (Tron = {}));
//# sourceMappingURL=resource_loader.js.map
var Tron;
(function (Tron) {
    var ResolverTypes = /** @class */ (function () {
        function ResolverTypes() {
        }
        ResolverTypes.Resource = "ResourceResolver";
        ResolverTypes.Template = "TemplateResolver";
        return ResolverTypes;
    }());
    Tron.ResolverTypes = ResolverTypes;
    var Dependency = /** @class */ (function () {
        function Dependency() {
        }
        return Dependency;
    }());
    Tron.Dependency = Dependency;
    var ResourceResolver = /** @class */ (function () {
        function ResourceResolver() {
        }
        ResourceResolver.prototype.resolve = function (dependencyOptions, success) {
            var resourceName = dependencyOptions.resourceName;
            if (Tron.app.localization.isResourceLoaded(resourceName)) {
                success();
            }
            else {
                Tron.app.localization.loadResource(resourceName, success);
            }
        };
        return ResourceResolver;
    }());
    Tron.ResourceResolver = ResourceResolver;
    var TemplateResolver = /** @class */ (function () {
        function TemplateResolver() {
        }
        TemplateResolver.prototype.resolve = function (dependencyOptions, success) {
            Tron.app.templates.loadTemplates(success);
        };
        return TemplateResolver;
    }());
    Tron.TemplateResolver = TemplateResolver;
})(Tron || (Tron = {}));
//# sourceMappingURL=dependency_resolver.js.map
var Tron;
(function (Tron) {
    Handlebars.registerHelper('translate', function (resourceName, key) {
        return Tron.app.localization.translate(resourceName, key);
    });
})(Tron || (Tron = {}));
//# sourceMappingURL=handlebars_extensions.js.map
var Tron;
(function (Tron) {
    var CookieService = /** @class */ (function () {
        function CookieService() {
        }
        CookieService.prototype.setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        };
        CookieService.prototype.getCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        return CookieService;
    }());
    Tron.CookieService = CookieService;
})(Tron || (Tron = {}));
//# sourceMappingURL=CookieService.js.map
var Tron;
(function (Tron) {
    var DependencyService = /** @class */ (function () {
        function DependencyService(dependencyLoader) {
            this.dependencyLoader = dependencyLoader;
            this.dependencies = [];
        }
        DependencyService.prototype.addResourceDepndency = function (resourceName) {
            var dependency = new Tron.Dependency();
            dependency.name = Tron.ResolverTypes.Resource;
            dependency.options = {
                resourceName: resourceName
            };
            this.dependencies.push(dependency);
        };
        DependencyService.prototype.loadTemplateDependency = function () {
            var dependency = new Tron.Dependency();
            dependency.name = Tron.ResolverTypes.Template;
            dependency.options = {};
            this.dependencies.push(dependency);
        };
        DependencyService.prototype.executeDependencies = function (success) {
            this.dependencyLoader.require(this.dependencies, success);
        };
        DependencyService.prototype.clear = function () {
            this.dependencies = [];
        };
        return DependencyService;
    }());
    Tron.DependencyService = DependencyService;
})(Tron || (Tron = {}));
//# sourceMappingURL=DependencyService.js.map
var Tron;
(function (Tron) {
    var SupportedLanguages = /** @class */ (function () {
        function SupportedLanguages() {
        }
        SupportedLanguages.Bulgarian = 0;
        SupportedLanguages.supportedLanguages = ["bg"];
        return SupportedLanguages;
    }());
    Tron.SupportedLanguages = SupportedLanguages;
    var Commands;
    (function (Commands) {
        Commands[Commands["FullData"] = 1] = "FullData";
        Commands[Commands["UpdateSubscribe"] = 2] = "UpdateSubscribe";
        Commands[Commands["UpdateUnsubscribe"] = 3] = "UpdateUnsubscribe";
        Commands[Commands["UpdateUnsubscribeAllSimilar"] = 4] = "UpdateUnsubscribeAllSimilar";
    })(Commands = Tron.Commands || (Tron.Commands = {}));
    var DataProviders;
    (function (DataProviders) {
        DataProviders[DataProviders["Messages"] = 1] = "Messages";
    })(DataProviders = Tron.DataProviders || (Tron.DataProviders = {}));
    var TronGameDirection;
    (function (TronGameDirection) {
        TronGameDirection[TronGameDirection["Up"] = 1] = "Up";
        TronGameDirection[TronGameDirection["Right"] = 2] = "Right";
        TronGameDirection[TronGameDirection["Down"] = 3] = "Down";
        TronGameDirection[TronGameDirection["Left"] = 4] = "Left";
    })(TronGameDirection = Tron.TronGameDirection || (Tron.TronGameDirection = {}));
})(Tron || (Tron = {}));
//# sourceMappingURL=Constants.js.map
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
var Tron;
(function (Tron) {
    var ModulesConfig = /** @class */ (function () {
        function ModulesConfig() {
        }
        ModulesConfig.prototype.init = function (app) {
            app.register('GamesModule', function (sb) { return new Tron.GamesModule(sb); })
                .register('TronModule', function (sb) { return new Tron.TronModule(sb); });
        };
        return ModulesConfig;
    }());
    Tron.ModulesConfig = ModulesConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=modules_config.js.map
var Tron;
(function (Tron) {
    var ServiceConfig = /** @class */ (function () {
        function ServiceConfig() {
        }
        ServiceConfig.prototype.init = function (app) {
            var _this = this;
            if (!this.webSocket) {
                this.webSocket = new Tron.WebSocketService(app);
            }
            app.services.add('cookies', function () { return new Tron.CookieService(); })
                .add('dependency', function () { return new Tron.DependencyService(Tron.app.dependency); })
                .add('websocket', function () { return _this.webSocket; })
                .add('game', function () { return new Tron.GameService(); })
                .add('users', function () { return new Tron.UsersService(app); });
        };
        return ServiceConfig;
    }());
    Tron.ServiceConfig = ServiceConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=services_config.js.map
var Tron;
(function (Tron) {
    var PagesConfig = /** @class */ (function () {
        function PagesConfig() {
            this.container = [];
        }
        PagesConfig.prototype.init = function (app) {
            this.app = app;
            this.container["games"] = "GamesPage";
            this.container["tron"] = "TronPage";
        };
        PagesConfig.prototype.getContainerPageTemplate = function (page, parameters) {
            var template = this.container[page];
            if (template) {
                return this.app.templates.getTemplate(this.container[page])(null);
            }
            return "";
        };
        return PagesConfig;
    }());
    Tron.PagesConfig = PagesConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=pages_config.js.map
var Tron;
(function (Tron) {
    var BaseService = /** @class */ (function () {
        function BaseService(url) {
            this.serviceUrl = "";
            this.serviceUrl = url;
            if (!BaseService.successFunc) {
                BaseService.successFunc = [];
                BaseService.resultCache = [];
            }
        }
        BaseService.prototype.setTimeoutfunc = function (key, func, success) {
            return "";
        };
        BaseService.prototype.getData = function (url, convert, success) {
            var key = this.getKey(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                Tron.app.ajax(that.url(url), {
                    method: "Get",
                    converter: function (response) {
                        return response;
                    },
                    success: that.success.bind(that, key),
                    error: function (reason) {
                        console.info("Error ocur in getData!");
                        console.info(reason);
                    },
                });
            }
            this.addObj(key, convert, success);
        };
        BaseService.prototype.postData = function (key, url, convert, success, data) {
            key = key + this.url(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                Tron.app.ajax(that.url(url), {
                    method: "Post",
                    data: data,
                    converter: function (response) {
                        return response;
                    },
                    success: that.success.bind(that, key),
                    error: function (reason) {
                        console.info("Error ocur in postData!");
                        console.info(reason);
                    },
                });
            }
            this.addObj(key, convert, success);
        };
        BaseService.prototype.url = function (url) {
            return this.serviceUrl + "/" + url;
        };
        BaseService.prototype.getKey = function (obj) {
            var key = this.serviceUrl + "/" + obj;
            return key;
        };
        BaseService.prototype.addObj = function (key, convert, success) {
            if (BaseService.successFunc[key]) {
                BaseService.successFunc[key].push({ success: success, convert: convert });
            }
            else {
                BaseService.successFunc[key] = new Tron.List();
                BaseService.successFunc[key].push({ success: success, convert: convert });
            }
        };
        BaseService.prototype.success = function (key, result) {
            this.addResultCache(key, result);
            var list = BaseService.successFunc[key];
            BaseService.successFunc[key] = null;
            for (var i = 0; i < list.objects.length; i++) {
                var obj = list.objects[i];
                obj.success(obj.convert(result));
            }
        };
        BaseService.prototype.addResultCache = function (key, result) {
            BaseService.resultCache[key] = result;
            setTimeout(function () {
                delete BaseService.resultCache[key];
            }, 2000);
        };
        BaseService.prototype.GeneralErrorHandle = function (reason) {
            console.info("Error ocur: " + reason);
        };
        return BaseService;
    }());
    Tron.BaseService = BaseService;
})(Tron || (Tron = {}));
//# sourceMappingURL=BaseService.js.map
var Tron;
(function (Tron) {
    var WebSocketService = /** @class */ (function () {
        function WebSocketService(app) {
            this.app = app;
            this.app.subscribe(["WebSocketDataReceived"], this.onWebSocketMessage.bind(this));
            if (!WebSocketService.subscribers) {
                WebSocketService.subscribers = [];
            }
        }
        WebSocketService.prototype.onWebSocketMessage = function (topic, data) {
            var json = JSON.parse(data.data);
            var socketMessage = new Tron.WebSocketMessage();
            socketMessage.deserialize(json);
            if (WebSocketService.subscribers[socketMessage.type]) {
                for (var i = 0; i < WebSocketService.subscribers[socketMessage.type].objects.length; i++) {
                    WebSocketService.subscribers[socketMessage.type].objects[i](socketMessage);
                }
            }
        };
        WebSocketService.prototype.addPlayer = function (gameId, name) {
            this.app.websocket.send(JSON.stringify({
                "MessageType": "addPlayer",
                "gameId": gameId,
                "name": name
            }));
        };
        WebSocketService.prototype.updateGameState = function (gameId, direction) {
            this.app.websocket.send(JSON.stringify({
                "MessageType": "tronDirectionUpdate",
                "gameId": gameId,
                "direction": direction
            }));
        };
        WebSocketService.prototype.subscribeForMessage = function (type, handler) {
            if (!WebSocketService.subscribers[type]) {
                WebSocketService.subscribers[type] = new Tron.List();
            }
            WebSocketService.subscribers[type].push(handler);
        };
        WebSocketService.prototype.unsubscribeForMessage = function (type, handler) {
            if (WebSocketService.subscribers[type]) {
                for (var i = 0; i < WebSocketService.subscribers[type].objects.length; i++) {
                    if (WebSocketService.subscribers[type].objects[i] == handler) {
                        WebSocketService.subscribers[type].objects.splice(i, 1);
                    }
                }
            }
        };
        return WebSocketService;
    }());
    Tron.WebSocketService = WebSocketService;
})(Tron || (Tron = {}));
//# sourceMappingURL=WebSocketService.js.map
var Tron;
(function (Tron) {
    var UsersService = /** @class */ (function () {
        function UsersService(app) {
            this.app = app;
        }
        UsersService.prototype.getUser = function () {
            if (!UsersService.user) {
                var cookieService = this.app.services.get("cookies");
                var name_1 = cookieService.getCookie("name");
                var id = parseInt(cookieService.getCookie("id"));
                UsersService.user = new Tron.User();
                UsersService.user.name = name_1;
                UsersService.user.id = id;
            }
            return UsersService.user;
        };
        return UsersService;
    }());
    Tron.UsersService = UsersService;
})(Tron || (Tron = {}));
//# sourceMappingURL=UsersService.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var GameService = /** @class */ (function (_super) {
        __extends(GameService, _super);
        function GameService() {
            return _super.call(this, "api/game") || this;
        }
        GameService.prototype.createGame = function (options, success) {
            var data = JSON.stringify({ "options": options });
            this.postData(data, "creategame", function (response) {
                return response;
            }, success, data);
        };
        return GameService;
    }(Tron.BaseService));
    Tron.GameService = GameService;
})(Tron || (Tron = {}));
//# sourceMappingURL=GameService.js.map
var Tron;
(function (Tron) {
    var BaseModule = /** @class */ (function () {
        function BaseModule(sb) {
            this.sandbox = sb;
            this.subscriptionTokens = [];
        }
        BaseModule.prototype.init = function (options) {
        };
        BaseModule.prototype.destroy = function () {
            this.removeEvents();
        };
        BaseModule.prototype.addEventToken = function (token) {
            this.subscriptionTokens.push(token);
        };
        BaseModule.prototype.removeEvents = function () {
            for (var i in this.subscriptionTokens) {
                var subscriptionToken = this.subscriptionTokens[i];
                subscriptionToken.destroy();
            }
        };
        return BaseModule;
    }());
    Tron.BaseModule = BaseModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=BaseModule.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var GamesModule = /** @class */ (function (_super) {
        __extends(GamesModule, _super);
        function GamesModule(sb) {
            return _super.call(this, sb) || this;
        }
        GamesModule.prototype.init = function (options) {
            _super.prototype.init.call(this, options);
            var dependencyService = this.sandbox.getService("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("games");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        };
        GamesModule.prototype.initRequirements = function (options, status, errorMessage) {
            this.presenter = new Tron.GamesPresenter(this.sandbox, new Tron.GamesView(this.sandbox.getTemplate("GamesModule")));
            this.presenter.view.presenter = this.presenter;
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        };
        GamesModule.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.presenter.destroy();
        };
        return GamesModule;
    }(Tron.BaseModule));
    Tron.GamesModule = GamesModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesModule.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var TronModule = /** @class */ (function (_super) {
        __extends(TronModule, _super);
        function TronModule(sb) {
            return _super.call(this, sb) || this;
        }
        TronModule.prototype.init = function (options) {
            _super.prototype.init.call(this, options);
            var dependencyService = this.sandbox.getService("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("tron");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        };
        TronModule.prototype.initRequirements = function (options, status, errorMessage) {
            this.presenter = new Tron.TronPresenter(this.sandbox, new Tron.TronView(this.sandbox.getTemplate("TronModule")));
            this.presenter.view.presenter = this.presenter;
            this.presenter.gameId = this.gameId = options["parameters"]["gameId"];
            var userService = this.sandbox.getService("users");
            var socket = this.sandbox.getService("websocket");
            this.wsSubscriptions = [];
            var playerUpdateSubscription = this.receivePlayerDataUpdate.bind(this);
            this.wsSubscriptions["PlayerData"] = playerUpdateSubscription;
            var gameUpdateSubscription = this.receiveGameDataUpdate.bind(this);
            this.wsSubscriptions["GameUpdate"] = gameUpdateSubscription;
            for (var i in this.wsSubscriptions) {
                socket.subscribeForMessage(i, this.wsSubscriptions[i]);
            }
            socket.addPlayer(this.gameId, userService.getUser().name);
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        };
        TronModule.prototype.receivePlayerDataUpdate = function (message) {
            var update = new Tron.TronPlayerUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameData(update);
        };
        TronModule.prototype.receiveGameDataUpdate = function (message) {
            var update = new Tron.TronGameUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameState(update);
        };
        TronModule.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.presenter.destroy();
            var socket = this.sandbox.getService("websocket");
            for (var i in this.wsSubscriptions) {
                socket.unsubscribeForMessage(i, this.wsSubscriptions[i]);
            }
        };
        return TronModule;
    }(Tron.BaseModule));
    Tron.TronModule = TronModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronModule.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var GamesView = /** @class */ (function (_super) {
        __extends(GamesView, _super);
        function GamesView(template) {
            var _this = _super.call(this, document.createElement('div'), template) || this;
            _this.addEventListener({
                type: "click",
                selector: "#create_tron_game",
                listener: _this.create_tron_game
            });
            return _this;
        }
        GamesView.prototype.render = function (model) {
            var root = _super.prototype.render.call(this, model);
            var nameContainer = this.root.querySelector("#playerName");
            nameContainer.innerHTML = this.presenter.getName();
            return root;
        };
        GamesView.prototype.create_tron_game = function () {
            var numberOfPlayersSelect = this.root.querySelector("#numberOfPlayers");
            this.presenter.createGame(parseInt(numberOfPlayersSelect.value));
        };
        return GamesView;
    }(Tron.app.mvpExt.baseView));
    Tron.GamesView = GamesView;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesView.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var TronView = /** @class */ (function (_super) {
        __extends(TronView, _super);
        function TronView(template) {
            var _this = _super.call(this, document.createElement('div'), template) || this;
            _this.colors = ["orange", "blue", "green", "purple"];
            _this.currentColors = ["darkorange", "darkblue", "darkgreen", "darkwhite"];
            _this.keyHandler = _this.handle_move.bind(_this);
            document.addEventListener("keypress", _this.keyHandler, true);
            return _this;
        }
        TronView.prototype.render = function (model) {
            var root = _super.prototype.render.call(this, model);
            return root;
        };
        TronView.prototype.handle_move = function (ev) {
            switch (ev.which) {
                case 100:
                    this.presenter.updateDirection(Tron.TronGameDirection.Right);
                    break;
                case 115:
                    this.presenter.updateDirection(Tron.TronGameDirection.Down);
                    break;
                case 97:
                    this.presenter.updateDirection(Tron.TronGameDirection.Left);
                    break;
                case 119:
                    this.presenter.updateDirection(Tron.TronGameDirection.Up);
                    break;
            }
        };
        TronView.prototype.drawInCanvas = function (x, y, position, current) {
            var mycanvas = this.root.querySelector('#tron_game');
            var ctx = mycanvas.getContext('2d');
            ctx.fillStyle = current ? "red" : this.colors[position];
            var squareXSize = mycanvas.width / this.boardX;
            var squareYSize = mycanvas.height / this.boardY;
            ctx.fillRect(x * squareXSize, y * squareYSize, squareXSize, squareYSize);
        };
        TronView.prototype.setGameData = function (state) {
            this.boardX = state.boardx;
            this.boardY = state.boardy;
        };
        TronView.prototype.updatePlayers = function (players) {
            var playersContainer = this.root.querySelector("#activePlayers");
            playersContainer.innerHTML = "";
            for (var i = 0; i < players.length; i++) {
                var playerContainer = document.createElement("div");
                playersContainer.appendChild(playerContainer);
                playerContainer.innerHTML = players[i].name;
                playerContainer.style.color = this.colors[players[i].position - 1];
            }
        };
        TronView.prototype.destroy = function () {
            document.removeEventListener("keypress", this.keyHandler, true);
            _super.prototype.destroy.call(this);
        };
        return TronView;
    }(Tron.app.mvpExt.baseView));
    Tron.TronView = TronView;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronView.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var GamesPresenter = /** @class */ (function (_super) {
        __extends(GamesPresenter, _super);
        function GamesPresenter(sb, view) {
            var _this = _super.call(this, view) || this;
            _this.sandbox = sb;
            return _this;
        }
        GamesPresenter.prototype.getName = function () {
            var user = this.sandbox.getService("users").getUser();
            return user.name;
        };
        GamesPresenter.prototype.createGame = function (numberOfPlayers) {
            var options = new Tron.GameOptions();
            options.numberOfPlayers = numberOfPlayers;
            options.type = Tron.GameType.Tron;
            var gameService = this.sandbox.getService("game");
            gameService.createGame(options, this.gameCreated.bind(this));
        };
        GamesPresenter.prototype.gameCreated = function (gameId) {
            window.location.hash = "#tron/" + gameId;
        };
        return GamesPresenter;
    }(dcore.plugins.mvp.Presenter));
    Tron.GamesPresenter = GamesPresenter;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesPresenter.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var TronPresenter = /** @class */ (function (_super) {
        __extends(TronPresenter, _super);
        function TronPresenter(sb, view) {
            var _this = _super.call(this, view) || this;
            _this.sandbox = sb;
            _this.players = [];
            return _this;
        }
        TronPresenter.prototype.destroy = function () {
            this.view.destroy();
        };
        TronPresenter.prototype.updateDirection = function (direction) {
            var socket = this.sandbox.getService("websocket");
            socket.updateGameState(this.gameId, direction);
        };
        TronPresenter.prototype.updateGameData = function (state) {
            this.playerGameData = state;
            this.view.setGameData(state);
        };
        TronPresenter.prototype.updateGameState = function (state) {
            if (state.state == Tron.GameState.WaitingForPlayers) {
                var oldPlayersCount = this.players.length;
                if (oldPlayersCount != state.players.length) {
                    this.players = state.players;
                    this.view.updatePlayers(this.players);
                }
            }
            if (state.state > Tron.GameState.WaitingForPlayers) {
                var positions = [];
                for (var i = 0; i < this.players.length; i++) {
                    positions[this.players[i].id] = this.players[i].position;
                }
                for (var i = 0; i < state.newCoordinates.length; i++) {
                    this.view.drawInCanvas(state.lastCoordinates[i].x, state.lastCoordinates[i].y, positions[state.lastCoordinates[i].id] - 1, false);
                }
                for (var i = 0; i < state.newCoordinates.length; i++) {
                    console.info(state.newCoordinates[i]);
                    this.view.drawInCanvas(state.newCoordinates[i].x, state.newCoordinates[i].y, positions[state.newCoordinates[i].id] - 1, true);
                }
            }
            if (state.state == Tron.GameState.Ended) {
                alert(state.winnerName);
            }
        };
        return TronPresenter;
    }(dcore.plugins.mvp.Presenter));
    Tron.TronPresenter = TronPresenter;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronPresenter.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tron;
(function (Tron) {
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(objects) {
            if (objects === void 0) { objects = []; }
            var _this = _super.call(this) || this;
            if (objects) {
                _this.objects = objects;
            }
            return _this;
        }
        List.prototype.pushRange = function (list) {
            this.objects = this.objects.concat(list.objects);
        };
        List.prototype.push = function (obj) {
            this.objects.push(obj);
        };
        List.prototype.pop = function () {
            return this.objects.pop();
        };
        return List;
    }(Tron.app.mvp.Model));
    Tron.List = List;
})(Tron || (Tron = {}));
//# sourceMappingURL=List.js.map
var Tron;
(function (Tron) {
    var User = /** @class */ (function () {
        function User() {
        }
        return User;
    }());
    Tron.User = User;
})(Tron || (Tron = {}));
//# sourceMappingURL=User.js.map
var Tron;
(function (Tron) {
    var GameType;
    (function (GameType) {
        GameType[GameType["Tron"] = 1] = "Tron";
    })(GameType = Tron.GameType || (Tron.GameType = {}));
    var GameOptions = /** @class */ (function () {
        function GameOptions() {
        }
        return GameOptions;
    }());
    Tron.GameOptions = GameOptions;
})(Tron || (Tron = {}));
//# sourceMappingURL=GameOptions.js.map
var Tron;
(function (Tron) {
    var WebSocketMessage = /** @class */ (function () {
        function WebSocketMessage() {
        }
        WebSocketMessage.prototype.deserialize = function (json) {
            this.type = json.type;
            this.data = json.data;
        };
        return WebSocketMessage;
    }());
    Tron.WebSocketMessage = WebSocketMessage;
})(Tron || (Tron = {}));
//# sourceMappingURL=WebSocketMessage.js.map
var Tron;
(function (Tron) {
    var TronCoordinate = /** @class */ (function () {
        function TronCoordinate() {
        }
        TronCoordinate.prototype.deserialize = function (json) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
        };
        return TronCoordinate;
    }());
    Tron.TronCoordinate = TronCoordinate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronCoordinate.js.map
var Tron;
(function (Tron) {
    var TronPlayer = /** @class */ (function () {
        function TronPlayer() {
        }
        TronPlayer.prototype.deserialize = function (json) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
            this.alive = json.alive;
            this.position = json.position;
            this.name = json.name;
        };
        return TronPlayer;
    }());
    Tron.TronPlayer = TronPlayer;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronPlayer.js.map
var Tron;
(function (Tron) {
    var AddPlayerState;
    (function (AddPlayerState) {
        AddPlayerState[AddPlayerState["PlayerAdded"] = 1] = "PlayerAdded";
        AddPlayerState[AddPlayerState["GameIsFull"] = 2] = "GameIsFull";
    })(AddPlayerState = Tron.AddPlayerState || (Tron.AddPlayerState = {}));
    var TronPlayerUpdate = /** @class */ (function () {
        function TronPlayerUpdate() {
        }
        TronPlayerUpdate.prototype.deserialize = function (json) {
            this.id = json.id;
            this.boardx = json.boardx;
            this.boardy = json.boardy;
            this.numberOfPlayers = json.numberOfPlayers;
            this.state = json.state;
        };
        return TronPlayerUpdate;
    }());
    Tron.TronPlayerUpdate = TronPlayerUpdate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronPlayerUpdate.js.map
var Tron;
(function (Tron) {
    var GameState;
    (function (GameState) {
        GameState[GameState["WaitingForPlayers"] = 1] = "WaitingForPlayers";
        GameState[GameState["Started"] = 2] = "Started";
        GameState[GameState["Ended"] = 3] = "Ended";
    })(GameState = Tron.GameState || (Tron.GameState = {}));
    var TronGameUpdate = /** @class */ (function () {
        function TronGameUpdate() {
            this.players = [];
            this.newCoordinates = [];
            this.lastCoordinates = [];
        }
        TronGameUpdate.prototype.deserialize = function (json) {
            this.winnerName = json.winnerName;
            this.state = json.state;
            this.players = [];
            if (json.players) {
                for (var i = 0; i < json.players.length; i++) {
                    var player = new Tron.TronPlayer();
                    player.deserialize(json.players[i]);
                    this.players[i] = player;
                }
            }
            this.lastCoordinates = [];
            if (json.lastCoordinates) {
                for (var i = 0; i < json.lastCoordinates.length; i++) {
                    var coordinate = new Tron.TronCoordinate();
                    coordinate.deserialize(json.lastCoordinates[i]);
                    this.lastCoordinates[i] = coordinate;
                }
            }
            this.newCoordinates = [];
            if (json.newCoordinates) {
                for (var i = 0; i < json.newCoordinates.length; i++) {
                    var coordinate = new Tron.TronCoordinate();
                    coordinate.deserialize(json.newCoordinates[i]);
                    this.newCoordinates[i] = coordinate;
                }
            }
        };
        return TronGameUpdate;
    }());
    Tron.TronGameUpdate = TronGameUpdate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronGameUpdate.js.map