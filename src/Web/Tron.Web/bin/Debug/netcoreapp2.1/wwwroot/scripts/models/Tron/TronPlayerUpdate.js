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