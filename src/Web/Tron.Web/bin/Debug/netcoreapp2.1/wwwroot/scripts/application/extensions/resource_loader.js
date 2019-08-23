var Tron;
(function (Tron) {
    var ResourceLoader = /** @class */ (function () {
        function ResourceLoader(basePath) {
            this.basePath = basePath;
        }
        ResourceLoader.prototype.loadLanguageResource = function (resourceName, language, success) {
            Tron.app.ajax(this.basePath + "/" + resourceName + "." + language + ".js?ver=" + version, {
                method: "Get",
                success: function (result) {
                    eval(result);
                    success(resourceName, Tron.Resources[resourceName]);
                }
            });
        };
        return ResourceLoader;
    }());
    Tron.ResourceLoader = ResourceLoader;
})(Tron || (Tron = {}));
//# sourceMappingURL=resource_loader.js.map