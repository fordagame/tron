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
    var GamesModule = /** @class */ (function (_super) {
        __extends(GamesModule, _super);
        function GamesModule(sb) {
            return _super.call(this, sb) || this;
        }
        GamesModule.prototype.init = function (options) {
            _super.prototype.init.call(this, options);
            var dependencyService = this.sandbox.getService("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("games");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        };
        GamesModule.prototype.initRequirements = function (options, status, errorMessage) {
            this.presenter = new Tron.GamesPresenter(this.sandbox, new Tron.GamesView(this.sandbox.getTemplate("GamesModule")));
            this.presenter.view.presenter = this.presenter;
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        };
        GamesModule.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.presenter.destroy();
        };
        return GamesModule;
    }(Tron.BaseModule));
    Tron.GamesModule = GamesModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=GamesModule.js.map