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