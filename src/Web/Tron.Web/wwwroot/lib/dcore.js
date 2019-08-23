var dcore;
(function (dcore) {
    "use strict";
    /**
     *  @class Sandbox - Connects all modules to the outside world.
     *  @property {String} moduleInstanceId - Id of the module it serves for.
     */
    var DefaultSandbox = /** @class */ (function () {
        function DefaultSandbox(core, moduleInstanceId) {
            if (!core || !moduleInstanceId) {
                throw new Error("Missing core or module instance ID.");
            }
            this.core = core;
            this.moduleInstanceId = moduleInstanceId;
        }
        /**
         *  Subscribes for given topics.
         *  @param {Array} topics Array of topics to subscribe for.
         *  @param {Function} handler The message handler.
         *  @returns {Object}
         */
        DefaultSandbox.prototype.subscribe = function (topics, handler) {
            return this.core.subscribe(topics, handler);
        };
        /**
         *  Publishes a message.
         *  @param {String} topic The topic of the message.
         *  @param {*} [data] Optional data.
         */
        DefaultSandbox.prototype.publish = function (topic, data) {
            this.core.publish(topic, data);
            return this;
        };
        /**
         *  Publishes a message.
         *  @param {String} topic The topic of the message.
         *  @param {*} [data] Optional data.
         */
        DefaultSandbox.prototype.publishSynchronize = function (topic, data) {
            this.core.publishSynchronize(topic, data);
            return this;
        };
        /**
         *  Starts an instance of given module and initializes it.
         *  @param {string} moduleId Id of the module which must be started.
         *  @param {object} [options] Optional options.
         */
        DefaultSandbox.prototype.start = function (moduleId, options) {
            this.core.start(moduleId, options);
            return this;
        };
        /**
         *  Stops a given module.
         *  @param {string} moduleId Id of the module which must be stopped.
         *  @param {string} [instanceId] Optional. Specific module's instance id.
         */
        DefaultSandbox.prototype.stop = function (moduleId, instanceId) {
            this.core.stop(moduleId, instanceId);
            return this;
        };
        return DefaultSandbox;
    }());
    dcore.DefaultSandbox = DefaultSandbox;
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var lastUsedSubscriptionID = 0;
    function typeGuard(expected, value, errorMsg) {
        var toThrow = false;
        switch (expected) {
            case "array":
                toThrow = !Array.isArray(value);
                break;
            default: toThrow = typeof value !== expected || value === null;
        }
        if (toThrow) {
            throw new TypeError(errorMsg);
        }
    }
    function runPlugins(hookType) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this.state.isRunning) {
            throw new Error("Core is not running.");
        }
        var plugins = this.hooks[hookType];
        if (!Array.isArray(plugins)) {
            return;
        }
        var argumentsLength = arguments.length;
        var args = new Array(argumentsLength - 1);
        for (var i = 1; i < argumentsLength; i++) {
            args[i - 1] = arguments[i];
        }
        for (var i = 0, len = plugins.length; i < len; i++) {
            try {
                plugins[i].apply(null, args);
            }
            catch (ex) {
                var argsDetails = args.length > 0 ? args.join(", ") : "none";
                console.error("Plugin execution failed on hook " + HookType[hookType] + ". Arguments: " + argsDetails + ". Message: " + ex);
            }
        }
    }
    function addSubscriber(topic, handler) {
        if (!hasOwnProperty.call(this.subscribers, topic)) {
            this.subscribers[topic] = {};
        }
        var subscriptionID = "t" + (++lastUsedSubscriptionID);
        this.subscribers[topic][subscriptionID] = handler;
        return subscriptionID;
    }
    var HookType;
    (function (HookType) {
        HookType[HookType["Core_DOMReady"] = 0] = "Core_DOMReady";
        HookType[HookType["Core_ModuleDestroy"] = 1] = "Core_ModuleDestroy";
        HookType[HookType["Core_ModuleInit"] = 2] = "Core_ModuleInit";
        HookType[HookType["Core_ModuleRegister"] = 3] = "Core_ModuleRegister";
        HookType[HookType["Core_Publish"] = 4] = "Core_Publish";
        HookType[HookType["Core_Subscribe"] = 5] = "Core_Subscribe";
        HookType[HookType["Core_Unsubscribe"] = 6] = "Core_Unsubscribe";
    })(HookType = dcore.HookType || (dcore.HookType = {}));
    var Instance = /** @class */ (function () {
        function Instance(sandboxType, isDebug) {
            if (isDebug === void 0) { isDebug = true; }
            this.subscribers = {};
            this.modules = {};
            this.hooks = {};
            this.Sandbox = typeof sandboxType === "function" ? sandboxType : dcore.DefaultSandbox;
            this.state = {
                isDebug: !!isDebug,
                isRunning: false
            };
        }
        /**
         *  Subscribes for given topics.
         *  @param {Array} topics Array of topics to subscribe for.
         *  @param {Function} handler The message handler.
         *  @returns {Object}
         */
        Instance.prototype.subscribe = function (topics, handler) {
            var errorMsg = "Subscribing failed:";
            typeGuard("function", handler, errorMsg + " message handler should be a function.");
            typeGuard("array", topics, errorMsg + " topics should be passed as an array of strings.");
            runPlugins.call(this, HookType.Core_Subscribe, topics);
            var token = {};
            for (var i = 0, len = topics.length; i < len; i++) {
                var topic = topics[i];
                var subscriptionID = addSubscriber.call(this, topic, handler);
                token[topic] = subscriptionID;
            }
            var that = this;
            return {
                destroy: function (topic) {
                    if (arguments.length === 0) {
                        Object.keys(token).forEach(function (t) {
                            runPlugins.call(that, HookType.Core_Unsubscribe, t);
                            var subscriptionID = token[t];
                            delete that.subscribers[t][subscriptionID];
                        });
                        return;
                    }
                    if (hasOwnProperty.call(token, topic)) {
                        runPlugins.call(that, HookType.Core_Unsubscribe, topic);
                        var subscriptionID = token[topic];
                        delete that.subscribers[topic][subscriptionID];
                    }
                }
            };
        };
        /**
         *  Publishes a message.
         *  @param {String} topic he topic of the message.
         *  @param {*} [data] Optional data.
         */
        Instance.prototype.publish = function (topic, data) {
            if (!hasOwnProperty.call(this.subscribers, topic)) {
                return;
            }
            runPlugins.call(this, HookType.Core_Publish, topic, data);
            var subscriptions = this.subscribers[topic];
            Object.keys(subscriptions)
                .forEach(function (key) {
                var handler = subscriptions[key];
                try {
                    // let the browser breathе
                    setTimeout(function () { return handler(topic, data); }, 0);
                }
                catch (ex) {
                    setTimeout(function () {
                        console.info(topic + " message publishing failed. Subscriber:");
                        console.info(handler);
                    }, 0);
                }
            });
        };
        Instance.prototype.publishSynchronize = function (topic, data) {
            if (!hasOwnProperty.call(this.subscribers, topic)) {
                return;
            }
            runPlugins.call(this, HookType.Core_Publish, topic, data);
            var subscriptions = this.subscribers[topic];
            Object.keys(subscriptions)
                .forEach(function (key) {
                var handler = subscriptions[key];
                try {
                    handler(topic, data);
                }
                catch (ex) {
                    console.info(topic + " message publishing failed. Subscriber:");
                    console.info(handler);
                }
            });
        };
        /**
         *  Registers a module.
         *  @param {string} moduleId
         *  @param {function} moduleFactory Function which provides an instance of the module.
         */
        Instance.prototype.register = function (moduleId, moduleFactory) {
            var errorMsg = moduleId + " registration failed:";
            typeGuard("string", moduleId, errorMsg + " module ID must be a string.");
            typeGuard("string", moduleId, errorMsg + " module ID must be a string.");
            typeGuard("undefined", this.modules[moduleId], errorMsg + " module with such id has been already registered.");
            var tempModule = moduleFactory(new this.Sandbox(this, moduleId));
            typeGuard("function", tempModule.init, errorMsg + " module does not implement init method.");
            typeGuard("function", tempModule.destroy, errorMsg + " module does not implement destroy method.");
            runPlugins.call(this, HookType.Core_ModuleRegister, moduleId, moduleFactory);
            this.modules[moduleId] = {
                create: moduleFactory,
                instances: {}
            };
            return this;
        };
        /**
         *  Starts an instance of given module and initializes it.
         *  @param {string} moduleId Id of the module which must be started.
         *  @param {object} [options] Optional options.
         */
        Instance.prototype.start = function (moduleId, options) {
            var module = this.modules[moduleId];
            options = options || {};
            var errorMsg = moduleId + " initialization failed:";
            typeGuard("object", module, errorMsg + " module not found.");
            typeGuard("object", options, errorMsg + " module options must be an object.");
            var instanceId = options["instanceId"] || moduleId;
            if (hasOwnProperty.call(module.instances, instanceId)) {
                // already initialized
                return this;
            }
            runPlugins.call(this, HookType.Core_ModuleInit, moduleId, options);
            var instance = module.create(new this.Sandbox(this, instanceId));
            module.instances[instanceId] = instance;
            instance.init(options);
            return this;
        };
        /**
         *  Stops a given module.
         *  @param {string} moduleId Id of the module, which must be stopped.
         *  @param {string} [instanceId] Specific module's instance id.
         */
        Instance.prototype.stop = function (moduleId, instanceId) {
            var module = this.modules[moduleId];
            var id = instanceId || moduleId;
            if (module && hasOwnProperty.call(module.instances, id)) {
                runPlugins.call(this, HookType.Core_ModuleDestroy, moduleId, instanceId);
                module.instances[id].destroy();
                delete module.instances[id];
            }
            return this;
        };
        /**
         *  Lists all registered module ids.
         */
        Instance.prototype.listModules = function () {
            return Object.keys(this.modules);
        };
        /**
         *  Hooks a given function to specific hook type.
         *  @param {HookType} hookType The hook type.
         *  @param {function} plugin The function needs to hook.
         */
        Instance.prototype.hook = function (hookType, plugin) {
            var errorMsg = "Hook plugin failed:";
            typeGuard("number", hookType, errorMsg + " hook type should be an HookType enum.");
            typeGuard("function", plugin, errorMsg + " plugin should be a function.");
            if (!Array.isArray(this.hooks[hookType])) {
                this.hooks[hookType] = [];
            }
            this.hooks[hookType].push(plugin);
            return this;
        };
        /**
         *  Runs the core.
         *  @param {Function} [action] Optional. A setup action executed before core run.
         */
        Instance.prototype.run = function (action) {
            if (this.state.isRunning) {
                return;
            }
            this.beforeRunAction = action;
            this._onDomReady = this._onDomReady.bind(this);
            if (document.readyState.toString() === "complete" ||
                document.readyState.toString() === "interactive" ||
                document.readyState.toString() === "loaded" /* old safari browsers */) {
                this._onDomReady(null);
            }
            else {
                document.addEventListener("DOMContentLoaded", this._onDomReady);
            }
            return this;
        };
        Instance.prototype._onDomReady = function (ev) {
            document.removeEventListener("DOMContentLoaded", this._onDomReady);
            this.state.isRunning = true;
            if (typeof this.beforeRunAction === "function") {
                this.beforeRunAction();
            }
            runPlugins.call(this, HookType.Core_DOMReady);
        };
        return Instance;
    }());
    dcore.Instance = Instance;
    /**
     *  Creates an application core instance.
     * @param {function} [sandboxType] Optional. Custom sandbox type.
     * @returns {Core}
     */
    function createOne(sandboxType) {
        return new Instance(sandboxType);
    }
    dcore.createOne = createOne;
})(dcore || (dcore = {}));
//# sourceMappingURL=dcore-1.0.0.js.map
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
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp;
        (function (mvp) {
            "use strict";
            mvp.ModelEvents = {
                Change: "change",
                Destroy: "destroy"
            };
            function asModel(target) {
                if (typeof target !== "object" || target === null) {
                    return null;
                }
                var model = new Model();
                for (var key in model) {
                    target[key] = model[key];
                }
                return target;
            }
            mvp.asModel = asModel;
            /**
             *  @class dcore.Model
             */
            var Model = /** @class */ (function () {
                function Model() {
                    this.listeners = {};
                }
                /**
                 *  Attaches an event handler to model raised events.
                 *  @param {String} eventType The name of the event.
                 *  @param {Function} handler The event's handler.
                 *  @param {Object} [context] The Handler's context.
                 */
                Model.prototype.on = function (eventType, handler, context) {
                    if (!eventType) {
                        return false;
                    }
                    this.listeners[eventType] = this.listeners[eventType] || [];
                    this.listeners[eventType].push({
                        handler: handler,
                        context: context
                    });
                    return true;
                };
                /**
                 *  Detaches an event handler.
                 *  @param {String} eventType The name of the event.
                 *  @param {Function} handler The handler which must be detached.
                 *  @param {Object} [context] The Handler's context.
                 */
                Model.prototype.off = function (eventType, handler, context) {
                    var listeners = this.listeners[eventType] || [];
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        var listener = listeners[i];
                        if (listener.handler === handler &&
                            listener.context === context) {
                            listener = listeners[len - 1];
                            listeners.length--;
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 *  Notifies the listeners attached for specific event.
                 */
                Model.prototype.notify = function (type, data) {
                    if (!Array.isArray(this.listeners[type])) {
                        return;
                    }
                    this.listeners[type]
                        .slice(0)
                        .forEach(function (listener) { return listener.handler.call(listener.context, data); });
                };
                /**
                 *  Notifies for change event.
                 */
                Model.prototype.change = function () {
                    this.notify(mvp.ModelEvents.Change, this);
                };
                /**
                 *  Notifies for destroy event.
                 */
                Model.prototype.destroy = function () {
                    this.notify(mvp.ModelEvents.Destroy, this);
                };
                return Model;
            }());
            mvp.Model = Model;
        })(mvp = plugins.mvp || (plugins.mvp = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp;
        (function (mvp) {
            "use strict";
            mvp.CollectionEvents = {
                AddedItems: "added-items",
                DeletedItems: "deleted-items",
                UpdatedItem: "updated-item"
            };
            function onItemChange(item) {
                this.notify(mvp.CollectionEvents.UpdatedItem, item);
            }
            function onItemDestroy(item) {
                this.removeRange([item]);
            }
            /**
             *  Composite pattern on dcore.Model.
             *  Holds the models in list.
             *  Iterating over the models is not in the order of their insertion.
             *  It is usefull when you want to listen for collection of models.
             *  @class dcore.Collection
             *  @augments dcore.Model
             */
            var Collection = /** @class */ (function (_super) {
                __extends(Collection, _super);
                function Collection(models) {
                    var _this = _super.call(this) || this;
                    _this.modelList = [];
                    if (Array.isArray(models)) {
                        _this.addRange(models);
                    }
                    return _this;
                }
                Object.defineProperty(Collection.prototype, "size", {
                    get: function () {
                        return this.modelList.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 *  Adds new model to the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.add = function (model) {
                    if (model) {
                        this.addRange([model]);
                    }
                };
                /**
                 *  Adds range of models to the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.addRange = function (models) {
                    var _this = this;
                    if (!Array.isArray(models)) {
                        return;
                    }
                    models.forEach(function (m) {
                        m.on(mvp.ModelEvents.Change, onItemChange, _this);
                        m.on(mvp.ModelEvents.Destroy, onItemDestroy, _this);
                        _this.modelList.push(m);
                    });
                    this.notify(mvp.CollectionEvents.AddedItems, models);
                };
                /**
                 *  Removes a model from the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.remove = function (model) {
                    this.removeRange([model]);
                };
                /**
                 *  Removes range of models from the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.removeRange = function (models) {
                    if (!Array.isArray(models)) {
                        return;
                    }
                    var deleted = [];
                    for (var i = 0, len = models.length; i < len; i++) {
                        var model = models[i];
                        var atIndex = this.modelList.indexOf(model);
                        if (atIndex < 0) {
                            continue;
                        }
                        model.off(mvp.ModelEvents.Change, onItemChange, this);
                        model.off(mvp.ModelEvents.Destroy, onItemDestroy, this);
                        this.modelList[atIndex] = this.modelList[this.size - 1];
                        this.modelList.length--;
                        deleted.push(model);
                    }
                    var isModified = deleted.length > 0;
                    if (isModified) {
                        this.notify(mvp.CollectionEvents.DeletedItems, deleted);
                    }
                };
                /**
                 *  Removes all models from the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.clear = function () {
                    this.removeRange(this.toArray());
                };
                /**
                 *  Determines whether a model is in the list.
                 *  @returns {Boolean}
                 */
                Collection.prototype.contains = function (model) {
                    return this.modelList.indexOf(model) >= 0;
                };
                /**
                 *  Determines whether the list is not empty.
                 *  @returns {Boolean}
                 */
                Collection.prototype.any = function () {
                    return this.size > 0;
                };
                /**
                 *  Returns the models as Array.
                 *  @returns {Array}
                 */
                Collection.prototype.toArray = function () {
                    return this.modelList.slice(0);
                };
                /**
                 *  Performs an action on each model in the list.
                 */
                Collection.prototype.forEach = function (action, context) {
                    this.modelList.forEach(action, context);
                };
                return Collection;
            }(mvp.Model));
            mvp.Collection = Collection;
        })(mvp = plugins.mvp || (plugins.mvp = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
// pollyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype["matchesSelector"] ||
            Element.prototype["mozMatchesSelector"] ||
            Element.prototype["msMatchesSelector"] ||
            Element.prototype["oMatchesSelector"] ||
            Element.prototype["webkitMatchesSelector"] ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                    continue;
                }
                return i > -1;
            };
}
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp;
        (function (mvp) {
            "use strict";
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var EventListenerConfig = /** @class */ (function () {
                function EventListenerConfig(type, selector, listener, useCapture, context) {
                    this.type = type;
                    this.selector = selector;
                    this.listener = listener;
                    this.useCapture = useCapture;
                    this.context = context;
                }
                EventListenerConfig.prototype.handleEvent = function (ev) {
                    var target = ev.target;
                    do {
                        if (!target.matches(this.selector)) {
                            target = target.parentElement;
                            continue;
                        }
                        ev.delegateTarget = target;
                        this.listener.call(this.context, ev);
                        return;
                    } while (target && target !== this.context.root);
                };
                return EventListenerConfig;
            }());
            /**
             *  @class dcore.View
             *  @property {HTMLElement} root
             */
            var View = /** @class */ (function () {
                function View(root) {
                    this.eventListeners = {};
                    this.root = root;
                }
                /**
                 *  Renders the view.
                 *  @returns {HTMLElement}
                 */
                View.prototype.render = function (data) {
                    return this.root;
                };
                /**
                 *  Adds event listeners to its root element by delegating to given selectors.
                 * @param {Array} configs
                 */
                View.prototype.addEventListeners = function (configs) {
                    var _this = this;
                    if (Array.isArray(configs)) {
                        configs.forEach(function (c) { return _this.addEventListener(c); });
                    }
                    return this;
                };
                /**
                 *  Adds an event listener to its root element by delegating to given selector.
                 * @param {Object} config
                 */
                View.prototype.addEventListener = function (config) {
                    if (typeof config !== "object" || config === null) {
                        throw new TypeError("Listener config must be passed as object.");
                    }
                    var eventType = config.type;
                    if (typeof eventType !== "string") {
                        throw new TypeError("Event type must be a string.");
                    }
                    var configObj = new EventListenerConfig(eventType, config.selector, config.listener, !!config.useCapture, this);
                    var key = eventType + " " + configObj.selector + " " + configObj.useCapture;
                    if (hasOwnProperty.call(this.eventListeners, key)) {
                        return this;
                    }
                    configObj.handleEvent = configObj.handleEvent.bind(configObj);
                    this.root.addEventListener(eventType, configObj.handleEvent, configObj.useCapture);
                    this.eventListeners[key] = configObj;
                    return this;
                };
                View.prototype.resetEvents = function () {
                    this.eventListeners = {};
                };
                /**
                 *  Destroys the view.
                 */
                View.prototype.destroy = function () {
                    var _this = this;
                    Object
                        .keys(this.eventListeners)
                        .forEach(function (type) {
                        var listener = _this.eventListeners[type];
                        _this.root.removeEventListener(listener.type, listener.handleEvent, listener.useCapture);
                        delete _this.eventListeners[type];
                    });
                    ;
                    this.eventListeners = {};
                    this.root = null;
                };
                return View;
            }());
            mvp.View = View;
        })(mvp = plugins.mvp || (plugins.mvp = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp;
        (function (mvp) {
            "use strict";
            /**
             *  @class dcore.Presenter
             */
            var Presenter = /** @class */ (function () {
                function Presenter(view) {
                    this._model = null;
                    this._view = null;
                    this._modelHandlers = {};
                    this._view = view;
                }
                Object.defineProperty(Presenter.prototype, "view", {
                    get: function () {
                        return this._view;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Presenter.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    set: function (model) {
                        var _this = this;
                        if (this.model === model) {
                            return;
                        }
                        var shouldDetach = this.model instanceof mvp.Model;
                        var shouldAttach = model instanceof mvp.Model;
                        Object
                            .keys(this._modelHandlers)
                            .forEach(function (type) {
                            var eventHandler = _this._modelHandlers[type];
                            if (shouldDetach) {
                                _this.model["off"](type, eventHandler, _this);
                            }
                            if (shouldAttach) {
                                model["on"](type, eventHandler, _this);
                            }
                        });
                        this._model = model;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 *  Determins which events to handle when model notifies.
                 */
                Presenter.prototype.onModel = function (eventType, handler) {
                    if (eventType && handler) {
                        this._modelHandlers[eventType] = handler;
                    }
                    return this;
                };
                /**
                 *  Renders its view.
                 */
                Presenter.prototype.render = function () {
                    return this.view.render(this.model);
                };
                /**
                 *  Destroys its model and view.
                 */
                Presenter.prototype.destroy = function () {
                    this.model = null;
                    this._view.destroy();
                    this._view = null;
                };
                return Presenter;
            }());
            mvp.Presenter = Presenter;
        })(mvp = plugins.mvp || (plugins.mvp = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    dcore.DefaultSandbox.prototype.asMVPModel = function (target) {
        return null;
    };
    var mvp = dcore.plugins.mvp;
    dcore.Instance.prototype.useMVP = function () {
        var that = this;
        if (that.mvp) {
            return;
        }
        that.mvp = {
            Model: mvp.Model,
            asMVPModel: mvp.asModel,
            ModelEvents: mvp.ModelEvents,
            Collection: mvp.Collection,
            CollectionEvents: mvp.CollectionEvents,
            View: mvp.View,
            Presenter: mvp.Presenter,
        };
        that.Sandbox.prototype.asMVPModel = mvp.asModel;
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=dcore-mvp.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var routing;
        (function (routing) {
            "use strict";
            /**
             *  @class UrlHash - Represents the string after "#" in a url.
             *  @property {String} value - The string after # in a url.
             *  @property {Array} tokens - The array of string tokens after splitint its value by / (slash).
             *  @property {Array} queryParams - The array of key-value pairs parsed from the query string in its value.
             */
            var UrlHash = /** @class */ (function () {
                function UrlHash() {
                    this.questionMarkIndex = -1;
                    this.url = "";
                    this.tokens = [];
                    this.queryParams = [];
                }
                Object.defineProperty(UrlHash.prototype, "value", {
                    get: function () {
                        return this.url;
                    },
                    set: function (url) {
                        url = url || "";
                        this.url = url;
                        this.questionMarkIndex = url.indexOf("?");
                        this.queryParams = [];
                        this.tokens = [];
                        this.populateQueryParams();
                        this.populateTokens();
                    },
                    enumerable: true,
                    configurable: true
                });
                UrlHash.prototype.anyQueryParams = function () {
                    return this.questionMarkIndex > -1;
                };
                UrlHash.prototype.populateQueryParams = function () {
                    var _this = this;
                    if (!this.anyQueryParams()) {
                        return;
                    }
                    this.queryParams = this.value
                        .substring(this.questionMarkIndex + 1)
                        .split("&")
                        .map(function (keyValuePairString) { return _this.parseQueryParam(keyValuePairString); });
                };
                UrlHash.prototype.parseQueryParam = function (keyValuePair) {
                    var args = keyValuePair.split("=");
                    return {
                        key: args[0],
                        value: args[1] || ""
                    };
                };
                UrlHash.prototype.populateTokens = function () {
                    var valueWithoutQuery = this.getValueWithoutQuery();
                    this.tokens = valueWithoutQuery
                        .split("/")
                        .filter(function (token) { return token !== ""; });
                };
                UrlHash.prototype.getValueWithoutQuery = function () {
                    if (!this.anyQueryParams()) {
                        return this.value;
                    }
                    return this.value.substring(0, this.value.length - (this.value.length - this.questionMarkIndex));
                };
                return UrlHash;
            }());
            routing.UrlHash = UrlHash;
        })(routing = plugins.routing || (plugins.routing = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var routing;
        (function (routing) {
            "use strict";
            var routeParamRegex = /{([a-zA-Z]+)}/; // e.g {id}
            /**
             *  @class Route - Accepts a pattern and split it by / (slash).
             *  It also supports dynamic params - {yourDynamicParam}.
             *  @property {String} pattern
             */
            var Route = /** @class */ (function () {
                function Route(pattern, onStart) {
                    this.tokens = [];
                    var errorMsg = "Route registration failed:";
                    if (typeof pattern !== "string") {
                        throw new TypeError(errorMsg + " pattern should be non empty string.");
                    }
                    if (typeof onStart !== "function") {
                        throw new TypeError(errorMsg + " callback should be a function.");
                    }
                    this.pattern = pattern;
                    this.callback = onStart;
                    this.populateTokens();
                }
                /**
                 *  The array of tokens after its pattern is splitted by / (slash).
                 */
                Route.prototype.getTokens = function () {
                    return this.tokens.slice(0);
                };
                /**
                 *  Determines whether it equals UrlHash.
                 */
                Route.prototype.equals = function (hashUrl) {
                    if (this.tokens.length !== hashUrl.tokens.length) {
                        return false;
                    }
                    for (var i = 0, len = this.tokens.length; i < len; i++) {
                        var token = this.tokens[i];
                        var urlToken = hashUrl.tokens[i];
                        if (token.isDynamic) {
                            continue;
                        }
                        if (token.name.toLowerCase() !== urlToken.toLowerCase()) {
                            return false;
                        }
                    }
                    return true;
                };
                /**
                 *  Populate the dynamic params from the UrlHash if such exist
                 *  and executes the registered callback.
                 */
                Route.prototype.start = function (urlHash) {
                    var queryParams = this.getParamsFromUrl(urlHash);
                    if (this.callback) {
                        this.callback(queryParams);
                    }
                };
                Route.prototype.populateTokens = function () {
                    var _this = this;
                    this.tokens = [];
                    this.pattern.split("/").forEach(function (urlFragment) {
                        if (urlFragment !== "") {
                            _this.tokens.push(_this.parseToken(urlFragment));
                        }
                    });
                };
                Route.prototype.parseToken = function (urlFragment) {
                    var paramMatchGroups = routeParamRegex.exec(urlFragment);
                    var isDynamic = !!paramMatchGroups;
                    return {
                        name: isDynamic ? paramMatchGroups[1] : urlFragment,
                        isDynamic: isDynamic
                    };
                };
                Route.prototype.getParamsFromUrl = function (url) {
                    var result = this.getQueryParamsFromUrl(url);
                    // route params are with higher priority than query params
                    this.tokens.forEach(function (token, index) {
                        if (token.isDynamic) {
                            result[token.name] = url.tokens[index];
                        }
                    });
                    return result;
                };
                Route.prototype.getQueryParamsFromUrl = function (url) {
                    var result = {};
                    url.queryParams.forEach(function (param) { return result[param.key] = param.value; });
                    return result;
                };
                return Route;
            }());
            routing.Route = Route;
        })(routing = plugins.routing || (plugins.routing = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var routing;
        (function (routing) {
            "use strict";
            function findRoute() {
                for (var i = 0, len = this.routes.length; i < len; i++) {
                    var route = this.routes[i];
                    if (route.equals(this.urlHash)) {
                        return route;
                    }
                }
                return null;
            }
            function startDefaultRoute(invalidHash) {
                window.history.replaceState(null, null, window.location.pathname + "#" + this.defaultUrl);
                this.urlHash.value = this.defaultUrl;
                var nextRoute = findRoute.call(this);
                if (nextRoute) {
                    nextRoute.start(this.urlHash);
                }
                else {
                    console.warn("No route handler for " + invalidHash);
                }
            }
            /**
             *  @class RouteConfig - Handles window hash change.
             */
            var RouteConfig = /** @class */ (function () {
                function RouteConfig() {
                    this.routes = [];
                    this.urlHash = new routing.UrlHash();
                    this.defaultUrl = null;
                }
                /**
                 *  Registers a route by given url pattern.
                 *  When url's hash is changed it executes a callback with populated dynamic routes and query parameters.
                 *  Dynamic route param can be registered with {yourParam}.
                 */
                RouteConfig.prototype.register = function (pattern, callback) {
                    if (this.routes.some(function (r) { return r.pattern === pattern; })) {
                        throw new Error("Route " + pattern + " has been already registered.");
                    }
                    this.routes.push(new routing.Route(pattern, callback));
                    return this;
                };
                /**
                 *  Starts hash url if such is registered, if not, it starts the default one.
                 */
                RouteConfig.prototype.startRoute = function (hash) {
                    this.urlHash.value = hash;
                    var nextRoute = findRoute.call(this);
                    if (nextRoute) {
                        nextRoute.start(this.urlHash);
                        return;
                    }
                    if (typeof this.defaultUrl === "string") {
                        startDefaultRoute.call(this, hash);
                    }
                    else {
                        console.warn("No route matches " + hash);
                    }
                };
                /**
                 *  Returns all registered patterns.
                 */
                RouteConfig.prototype.getRoutes = function () {
                    return this.routes.map(function (route) { return route.pattern; });
                };
                /**
                 *  Determines if there are any registered routes.
                 */
                RouteConfig.prototype.hasRoutes = function () {
                    return this.routes.length > 0;
                };
                return RouteConfig;
            }());
            routing.RouteConfig = RouteConfig;
        })(routing = plugins.routing || (plugins.routing = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    var routing = dcore.plugins.routing;
    dcore.Instance.prototype.useRouting = function () {
        var that = this;
        if (that.routing) {
            return;
        }
        that.routing = new routing.RouteConfig();
        that.hook(dcore.HookType.Core_DOMReady, function () {
            if (!that.routing.hasRoutes()) {
                return;
            }
            var global = window;
            that.routing.startRoute(global.location.hash.substring(1));
            global.addEventListener("hashchange", function () {
                that.routing.startRoute(global.location.hash.substring(1));
            });
        });
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=dcore-routing.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var services;
        (function (services) {
            "use strict";
            var ServiceConfig = /** @class */ (function () {
                function ServiceConfig() {
                    this.services = {};
                }
                /**
                 *  Add a service.
                 *  @param {String} id
                 *  @param {Function} factory - function which provides an instance of the service.
                 */
                ServiceConfig.prototype.add = function (id, creator) {
                    if (typeof id !== "string" || id === "") {
                        throw new TypeError(id + " service registration failed: ID must be non empty string.");
                    }
                    if (typeof creator !== "function") {
                        throw new TypeError(id + " service registration failed: creator must be a function.");
                    }
                    if (this.services[id]) {
                        throw new TypeError(id + " service registration failed: a service with such id has been already added.");
                    }
                    this.services[id] = creator;
                    return this;
                };
                /**
                 *  Gets a specific service instance by id.
                 *  @param {String} id
                 *  @returns {*}
                 */
                ServiceConfig.prototype.get = function (id) {
                    var creator = this.services[id];
                    if (!creator) {
                        throw new ReferenceError(id + " service was not found.");
                    }
                    return creator();
                };
                return ServiceConfig;
            }());
            services.ServiceConfig = ServiceConfig;
        })(services = plugins.services || (plugins.services = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    dcore.DefaultSandbox.prototype.getService = function (id) {
        return null;
    };
    var services = dcore.plugins.services;
    dcore.Instance.prototype.useServices = function () {
        var that = this;
        if (that.services) {
            return;
        }
        that.services = new services.ServiceConfig();
        /**
         *  Gets a specific service instance by id.
         *  @param {String} id
         *  @returns {*}
         */
        that.Sandbox.prototype.getService = function (id) {
            return this.core.services.get(id);
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=dcore-services.js.map
var dcore;
(function (dcore) {
    "use strict";
    dcore.DefaultSandbox.prototype.ajax = function (url, options) {
        return null;
    };
    dcore.Instance.prototype.useAjax = function () {
        var that = this;
        if (that.ajax) {
            return;
        }
        that.ajax = function (url, options) {
            var request = {
                method: options.method || "GET",
                contentType: options.contentType || "application/json",
                responseType: options.responseType || "",
                converter: options.converter || function (response) { return response; },
                success: options.success,
                error: options.error || function (reason) { return; },
                data: options.data || "",
            };
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, url, true);
            if (request.contentType != "empty") {
                xhr.setRequestHeader("Content-type", request.contentType);
            }
            xhr.responseType = request.responseType;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.responseURL && xhr.responseURL.indexOf("Account/Login") != -1) {
                        window.location.href = "/Account/Login";
                    }
                    switch (xhr.status) {
                        case 200:
                            request.success(request.converter(xhr.responseText));
                            break;
                        default:
                            request.error("Service error.");
                            break;
                    }
                }
            };
            xhr.send(request.data);
        };
        that.Sandbox.prototype.ajax = function (url, options) {
            return this["core"].ajax(url, options);
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=ajax.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var localization;
        (function (localization) {
            var Localization = /** @class */ (function () {
                function Localization(resourceLoader, defaultLanguage) {
                    this.resources = [];
                    this.resourceLoader = resourceLoader;
                    this.currentLanguage = defaultLanguage;
                    this.loadedResources = [];
                    this.onSuccessFunctions = [];
                }
                Localization.prototype.loadResource = function (resourceName, success) {
                    if (!this.onSuccessFunctions[resourceName]) {
                        this.onSuccessFunctions[resourceName] = [];
                    }
                    if (this.onSuccessFunctions[resourceName].length == 0) {
                        this.resourceLoader.loadLanguageResource(resourceName, this.currentLanguage, this.loadResourcesSuccess.bind(this));
                    }
                    this.onSuccessFunctions[resourceName].push(success);
                };
                Localization.prototype.changeLanguage = function (language) {
                    this.currentLanguage = language;
                    for (var i in this.loadedResources) {
                        this.loadedResources[i] = "notloaded";
                    }
                };
                Localization.prototype.loadResourcesSuccess = function (resourceName, result) {
                    this.resources[resourceName] = result;
                    this.loadedResources[resourceName] = "loaded";
                    for (var i = 0; i < this.onSuccessFunctions[resourceName].length; i++) {
                        this.onSuccessFunctions[resourceName][i](resourceName);
                    }
                    this.onSuccessFunctions[resourceName] = [];
                };
                Localization.prototype.translate = function (resourceName, key) {
                    if (this.resources[resourceName]) {
                        return this.resources[resourceName][key];
                    }
                };
                Localization.prototype.getResources = function (resourceName) {
                    return this.resources[resourceName];
                };
                Localization.prototype.getAllResources = function () {
                    return this.resources;
                };
                Localization.prototype.isResourceLoaded = function (resourceName) {
                    return this.loadedResources[resourceName] == "loaded";
                };
                Localization.prototype.destroy = function () {
                };
                return Localization;
            }());
            localization.Localization = Localization;
        })(localization = plugins.localization || (plugins.localization = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getLocalization = function () {
        return null;
    };
    dcore.Instance.prototype.useLocalization = function (resourceLoader, defaultLanguage) {
        var that = this;
        if (that.localization) {
            that.localization.destroy();
        }
        that.localization = new dcore.plugins.localization.Localization(resourceLoader, defaultLanguage);
        that.Sandbox.prototype.getLocalization = function () {
            return that.localization;
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=localization_extension.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var templates;
        (function (templates) {
            var TemplateResolver = /** @class */ (function () {
                function TemplateResolver(templateDictionary, templateNameFormat) {
                    this.templates = [];
                    this.templateDictionary = templateDictionary;
                    this.templateNameFormat = templateNameFormat;
                }
                TemplateResolver.prototype.getTemplate = function (templateName) {
                    if (!this.templates[templateName]) {
                        this.templates[templateName] = this.templateDictionary[this.templateNameFormat(templateName)];
                    }
                    return this.templates[templateName];
                };
                TemplateResolver.prototype.loadTemplates = function (success) {
                    success();
                };
                TemplateResolver.prototype.destroy = function () {
                    this.templates = [];
                };
                return TemplateResolver;
            }());
            templates.TemplateResolver = TemplateResolver;
        })(templates = plugins.templates || (plugins.templates = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getTemplate = function (templateName) {
        return null;
    };
    dcore.Instance.prototype.useTemplateResolver = function (templateResolver) {
        var that = this;
        if (that.templates) {
            that.templates.destroy();
        }
        that.templates = templateResolver;
        that.Sandbox.prototype.getTemplate = function (templateName) {
            return that.templates.getTemplate(templateName);
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=templates_extensions.js.map
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
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp_extension;
        (function (mvp_extension) {
            var BaseView = /** @class */ (function (_super) {
                __extends(BaseView, _super);
                function BaseView(root, template) {
                    var _this = _super.call(this, root) || this;
                    _this.template = template;
                    return _this;
                }
                /**
                 *  Renders the view.
                 *  @returns {HTMLElement}
                 */
                BaseView.prototype.render = function (model) {
                    var root = _super.prototype.render.call(this, model);
                    if (this.template) {
                        root.innerHTML = this.template.call(this, model);
                    }
                    return root;
                };
                return BaseView;
            }(dcore.plugins.mvp.View));
            mvp_extension.BaseView = BaseView;
        })(mvp_extension = plugins.mvp_extension || (plugins.mvp_extension = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp_extension;
        (function (mvp_extension) {
            var BaseModel = /** @class */ (function (_super) {
                __extends(BaseModel, _super);
                function BaseModel() {
                    return _super.call(this) || this;
                }
                return BaseModel;
            }(dcore.plugins.mvp.Model));
            mvp_extension.BaseModel = BaseModel;
        })(mvp_extension = plugins.mvp_extension || (plugins.mvp_extension = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    var mvpExtView = dcore.plugins.mvp_extension;
    var mvpExtModel = dcore.plugins.mvp_extension;
    dcore.Instance.prototype.useMVPExtended = function () {
        var that = this;
        if (that.mvpExt) {
            return;
        }
        that.mvpExt = {
            baseView: mvpExtView.BaseView,
            baseModel: mvpExtModel.BaseModel
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=mvp_extensions.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var dependency;
        (function (dependency) {
            var DependencyLoader = /** @class */ (function () {
                function DependencyLoader(concreteResolvers) {
                    this.loadedDependencies = [];
                    this.concreteResolvers = concreteResolvers;
                }
                DependencyLoader.prototype.require = function (dependencies, success) {
                    if (dependencies.length == 0) {
                        success(true, "");
                    }
                    else {
                        var dependencny = dependencies.pop();
                        var that_1 = this;
                        var concreteResolver = this.concreteResolvers[dependencny.name];
                        if (concreteResolver) {
                            concreteResolver.resolve(dependencny.options, function () {
                                that_1.require(dependencies, success);
                            });
                        }
                        else {
                            success(false, "Depdencny resolver for " + dependencny.name + " was not found");
                        }
                    }
                };
                DependencyLoader.prototype.destroy = function () {
                };
                return DependencyLoader;
            }());
            dependency.DependencyLoader = DependencyLoader;
        })(dependency = plugins.dependency || (plugins.dependency = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getDependencyLoader = function () {
        return null;
    };
    dcore.Instance.prototype.useDependencyLoader = function (concreteResolvers) {
        var that = this;
        if (that.dependency) {
            that.dependency.destroy();
        }
        that.dependency = new dcore.plugins.dependency.DependencyLoader(concreteResolvers);
        that.Sandbox.prototype.getDependencyLoader = function () {
            return that.dependency;
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=dependency_loader_extension.js.map
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var websockets;
        (function (websockets) {
            var WebSocketManager = /** @class */ (function () {
                function WebSocketManager(onSocketMessageReceived) {
                    this.webSocketCheckTimeoutInterval = 60000;
                    this.onSocketMessageReceived = onSocketMessageReceived;
                }
                WebSocketManager.prototype.init = function (webSocketHandlerUrl) {
                    try {
                        this.webSocketHandlerUrl = webSocketHandlerUrl;
                        var protocol = window.location.protocol == "https:" ? "wss" : "ws";
                        var host = location.hostname + (location.port ? ':' + location.port : '');
                        var webSocketUrl = protocol + '://' + host + '/' + webSocketHandlerUrl;
                        var that = this;
                        this.socket = new WebSocket(webSocketUrl);
                        this.socket.onopen = function () {
                            console.log("open " + new Date());
                        };
                        this.socket.onmessage = function (evt) {
                            that.onSocketMessageReceived(evt);
                        };
                        this.socket.onerror = function (evt) {
                            console.log("Error: " + evt);
                        };
                        this.socket.onclose = function () {
                            console.info("close " + new Date());
                        };
                        if (this.webSocketStatusChecker == null) {
                            this.webSocketStatusChecker = setTimeout(this.CheckForWebSocketConnection.bind(this), this.webSocketCheckTimeoutInterval);
                        }
                    }
                    catch (ex) {
                        console.info(ex);
                        if (this.webSocketStatusChecker == null) {
                            this.webSocketStatusChecker = setTimeout(this.CheckForWebSocketConnection.bind(this), this.webSocketCheckTimeoutInterval);
                        }
                    }
                };
                WebSocketManager.prototype.CheckForWebSocketConnection = function () {
                    if (this.socket.readyState > 1) {
                        clearTimeout(this.webSocketStatusChecker);
                        this.webSocketStatusChecker = null;
                        this.init(this.webSocketHandlerUrl);
                    }
                    this.webSocketStatusChecker = setTimeout(this.CheckForWebSocketConnection.bind(this), this.webSocketCheckTimeoutInterval);
                };
                WebSocketManager.prototype.send = function (data, retryCounter) {
                    if (retryCounter === void 0) { retryCounter = 0; }
                    if (retryCounter > 5) {
                        return;
                    }
                    if (this.socket.readyState == 1) {
                        this.socket.send(data);
                        return;
                    }
                    setTimeout(this.send.bind(this, data, retryCounter + 1), 1500);
                };
                WebSocketManager.prototype.close = function () {
                    this.socket.close();
                    if (this.webSocketStatusChecker != null) {
                        clearTimeout(this.webSocketStatusChecker);
                        this.webSocketStatusChecker = null;
                    }
                };
                return WebSocketManager;
            }());
            websockets.WebSocketManager = WebSocketManager;
        })(websockets = plugins.websockets || (plugins.websockets = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    var webSocketExt = dcore.plugins.websockets;
    dcore.Instance.prototype.useWebSocket = function () {
        var that = this;
        if (that.websocket) {
            return;
        }
        var onMessageReceived = function (data) {
            that.publish("WebSocketDataReceived", data);
        };
        that.websocket = new webSocketExt.WebSocketManager(onMessageReceived);
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=WebSockets.js.map