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