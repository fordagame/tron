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