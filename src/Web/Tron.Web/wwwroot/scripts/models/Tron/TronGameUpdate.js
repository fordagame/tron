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