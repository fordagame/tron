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
    var GamesView = /** @class */ (function (_super) {
        __extends(GamesView, _super);
        function GamesView(template) {
            var _this = _super.call(this, document.createElement('div'), template) || this;
            _this.addEventListener({
                type: "click",
                selector: "#create_tron_game",
                listener: _this.create_tron_game
            });
            return _this;
        }
        GamesView.prototype.render = function (model) {
            var root = _super.prototype.render.call(this, model);
            var nameContainer = this.root.querySelector("#playerName");
            nameContainer.innerHTML = this.presenter.getName();
            return root;
        };
        GamesView.prototype.create_tron_game = function () {
            var numberOfPlayersSelect = this.root.querySelector("#numberOfPlayers");
            this.presenter.createGame(parseInt(numberOfPlayersSelect.value));
        };
        return GamesView;
    }(Tron.app.mvpExt.baseView));
    Tron.GamesView = GamesView;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesView.js.map