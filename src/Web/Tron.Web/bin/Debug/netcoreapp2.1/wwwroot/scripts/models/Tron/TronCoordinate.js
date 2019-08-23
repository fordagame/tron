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