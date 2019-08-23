var Tron;
(function (Tron) {
    var PagesConfig = /** @class */ (function () {
        function PagesConfig() {
            this.container = [];
        }
        PagesConfig.prototype.init = function (app) {
            this.app = app;
            this.container["games"] = "GamesPage";
            this.container["tron"] = "TronPage";
        };
        PagesConfig.prototype.getContainerPageTemplate = function (page, parameters) {
            var template = this.container[page];
            if (template) {
                return this.app.templates.getTemplate(this.container[page])(null);
            }
            return "";
        };
        return PagesConfig;
    }());
    Tron.PagesConfig = PagesConfig;
})(Tron || (Tron = {}));
//# sourceMappingURL=pages_config.js.map