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
    var GamesPresenter = /** @class */ (function (_super) {
        __extends(GamesPresenter, _super);
        function GamesPresenter(sb, view) {
            var _this = _super.call(this, view) || this;
            _this.sandbox = sb;
            return _this;
        }
        GamesPresenter.prototype.getName = function () {
            var user = this.sandbox.getService("users").getUser();
            return user.name;
        };
        GamesPresenter.prototype.createGame = function (numberOfPlayers) {
            var options = new Tron.GameOptions();
            options.numberOfPlayers = numberOfPlayers;
            options.type = Tron.GameType.Tron;
            var gameService = this.sandbox.getService("game");
            gameService.createGame(options, this.gameCreated.bind(this));
        };
        GamesPresenter.prototype.gameCreated = function (gameId) {
            window.location.hash = "#tron/" + gameId;
        };
        return GamesPresenter;
    }(dcore.plugins.mvp.Presenter));
    Tron.GamesPresenter = GamesPresenter;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesPresenter.js.map