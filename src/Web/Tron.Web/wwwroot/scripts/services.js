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