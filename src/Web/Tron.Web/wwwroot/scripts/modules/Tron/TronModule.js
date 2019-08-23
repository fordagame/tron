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
    var TronModule = /** @class */ (function (_super) {
        __extends(TronModule, _super);
        function TronModule(sb) {
            return _super.call(this, sb) || this;
        }
        TronModule.prototype.init = function (options) {
            _super.prototype.init.call(this, options);
            var dependencyService = this.sandbox.getService("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("tron");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        };
        TronModule.prototype.initRequirements = function (options, status, errorMessage) {
            this.presenter = new Tron.TronPresenter(this.sandbox, new Tron.TronView(this.sandbox.getTemplate("TronModule")));
            this.presenter.view.presenter = this.presenter;
            this.presenter.gameId = this.gameId = options["parameters"]["gameId"];
            var userService = this.sandbox.getService("users");
            var socket = this.sandbox.getService("websocket");
            this.wsSubscriptions = [];
            var playerUpdateSubscription = this.receivePlayerDataUpdate.bind(this);
            this.wsSubscriptions["PlayerData"] = playerUpdateSubscription;
            var gameUpdateSubscription = this.receiveGameDataUpdate.bind(this);
            this.wsSubscriptions["GameUpdate"] = gameUpdateSubscription;
            for (var i in this.wsSubscriptions) {
                socket.subscribeForMessage(i, this.wsSubscriptions[i]);
            }
            socket.addPlayer(this.gameId, userService.getUser().name);
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        };
        TronModule.prototype.receivePlayerDataUpdate = function (message) {
            var update = new Tron.TronPlayerUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameData(update);
        };
        TronModule.prototype.receiveGameDataUpdate = function (message) {
            var update = new Tron.TronGameUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameState(update);
        };
        TronModule.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.presenter.destroy();
            var socket = this.sandbox.getService("websocket");
            for (var i in this.wsSubscriptions) {
                socket.unsubscribeForMessage(i, this.wsSubscriptions[i]);
            }
        };
        return TronModule;
    }(Tron.BaseModule));
    Tron.TronModule = TronModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronModule.js.map