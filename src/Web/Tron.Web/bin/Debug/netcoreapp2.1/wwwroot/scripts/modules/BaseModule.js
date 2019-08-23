var Tron;
(function (Tron) {
    var BaseModule = /** @class */ (function () {
        function BaseModule(sb) {
            this.sandbox = sb;
            this.subscriptionTokens = [];
        }
        BaseModule.prototype.init = function (options) {
        };
        BaseModule.prototype.destroy = function () {
            this.removeEvents();
        };
        BaseModule.prototype.addEventToken = function (token) {
            this.subscriptionTokens.push(token);
        };
        BaseModule.prototype.removeEvents = function () {
            for (var i in this.subscriptionTokens) {
                var subscriptionToken = this.subscriptionTokens[i];
                subscriptionToken.destroy();
            }
        };
        return BaseModule;
    }());
    Tron.BaseModule = BaseModule;
})(Tron || (Tron = {}));
//# sourceMappingURL=BaseModule.js.map