var Tron;
(function (Tron) {
    var UsersService = /** @class */ (function () {
        function UsersService(app) {
            this.app = app;
        }
        UsersService.prototype.getUser = function () {
            if (!UsersService.user) {
                var cookieService = this.app.services.get("cookies");
                var name_1 = cookieService.getCookie("name");
                var id = parseInt(cookieService.getCookie("id"));
                UsersService.user = new Tron.User();
                UsersService.user.name = name_1;
                UsersService.user.id = id;
            }
            return UsersService.user;
        };
        return UsersService;
    }());
    Tron.UsersService = UsersService;
})(Tron || (Tron = {}));
//# sourceMappingURL=UsersService.js.map