var Tron;
(function (Tron) {
    var ModulesConfig = /** @class */ (function () {
        function ModulesConfig() {
        }
        ModulesConfig.prototype.init = function (app) {
            app.register('GamesModule', function (sb) { return new Tron.GamesModule(sb); })
                .register('TronModule', function (sb) { return new Tron.TronModule(sb); });
        };
        return ModulesConfig;
    }());
    Tron.ModulesConfig = ModulesConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=modules_config.js.map