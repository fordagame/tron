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