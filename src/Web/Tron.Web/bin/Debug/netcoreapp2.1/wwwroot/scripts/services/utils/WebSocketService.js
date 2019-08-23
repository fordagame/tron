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