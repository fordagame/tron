var Tron;
(function (Tron) {
    var ServiceConfig = /** @class */ (function () {
        function ServiceConfig() {
        }
        ServiceConfig.prototype.init = function (app) {
            var _this = this;
            if (!this.webSocket) {
                this.webSocket = new Tron.WebSocketService(app);
            }
            app.services.add('cookies', function () { return new Tron.CookieService(); })
                .add('dependency', function () { return new Tron.DependencyService(Tron.app.dependency); })
                .add('websocket', function () { return _this.webSocket; })
                .add('game', function () { return new Tron.GameService(); })
                .add('users', function () { return new Tron.UsersService(app); });
        };
        return ServiceConfig;
    }());
    Tron.ServiceConfig = ServiceConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=services_config.js.map