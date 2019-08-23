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
    var TronView = /** @class */ (function (_super) {
        __extends(TronView, _super);
        function TronView(template) {
            var _this = _super.call(this, document.createElement('div'), template) || this;
            _this.colors = ["orange", "blue", "green", "purple"];
            _this.currentColors = ["darkorange", "darkblue", "darkgreen", "darkwhite"];
            _this.keyHandler = _this.handle_move.bind(_this);
            document.addEventListener("keypress", _this.keyHandler, true);
            return _this;
        }
        TronView.prototype.render = function (model) {
            var root = _super.prototype.render.call(this, model);
            return root;
        };
        TronView.prototype.handle_move = function (ev) {
            switch (ev.which) {
                case 100:
                    this.presenter.updateDirection(Tron.TronGameDirection.Right);
                    break;
                case 115:
                    this.presenter.updateDirection(Tron.TronGameDirection.Down);
                    break;
                case 97:
                    this.presenter.updateDirection(Tron.TronGameDirection.Left);
                    break;
                case 119:
                    this.presenter.updateDirection(Tron.TronGameDirection.Up);
                    break;
            }
        };
        TronView.prototype.drawInCanvas = function (x, y, position, current) {
            var mycanvas = this.root.querySelector('#tron_game');
            var ctx = mycanvas.getContext('2d');
            ctx.fillStyle = current ? "red" : this.colors[position];
            var squareXSize = mycanvas.width / this.boardX;
            var squareYSize = mycanvas.height / this.boardY;
            ctx.fillRect(x * squareXSize, y * squareYSize, squareXSize, squareYSize);
        };
        TronView.prototype.setGameData = function (state) {
            this.boardX = state.boardx;
            this.boardY = state.boardy;
        };
        TronView.prototype.updatePlayers = function (players) {
            var playersContainer = this.root.querySelector("#activePlayers");
            playersContainer.innerHTML = "";
            for (var i = 0; i < players.length; i++) {
                var playerContainer = document.createElement("div");
                playersContainer.appendChild(playerContainer);
                playerContainer.innerHTML = players[i].name;
                playerContainer.style.color = this.colors[players[i].position - 1];
            }
        };
        TronView.prototype.destroy = function () {
            document.removeEventListener("keypress", this.keyHandler, true);
            _super.prototype.destroy.call(this);
        };
        return TronView;
    }(Tron.app.mvpExt.baseView));
    Tron.TronView = TronView;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronView.js.map