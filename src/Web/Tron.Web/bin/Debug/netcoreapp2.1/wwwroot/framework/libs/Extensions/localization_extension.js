var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var localization;
        (function (localization) {
            var Localization = /** @class */ (function () {
                function Localization(resourceLoader, defaultLanguage) {
                    this.resources = [];
                    this.resourceLoader = resourceLoader;
                    this.currentLanguage = defaultLanguage;
                    this.loadedResources = [];
                    this.onSuccessFunctions = [];
                }
                Localization.prototype.loadResource = function (resourceName, success) {
                    if (!this.onSuccessFunctions[resourceName]) {
                        this.onSuccessFunctions[resourceName] = [];
                    }
                    if (this.onSuccessFunctions[resourceName].length == 0) {
                        this.resourceLoader.loadLanguageResource(resourceName, this.currentLanguage, this.loadResourcesSuccess.bind(this));
                    }
                    this.onSuccessFunctions[resourceName].push(success);
                };
                Localization.prototype.changeLanguage = function (language) {
                    this.currentLanguage = language;
                    for (var i in this.loadedResources) {
                        this.loadedResources[i] = "notloaded";
                    }
                };
                Localization.prototype.loadResourcesSuccess = function (resourceName, result) {
                    this.resources[resourceName] = result;
                    this.loadedResources[resourceName] = "loaded";
                    for (var i = 0; i < this.onSuccessFunctions[resourceName].length; i++) {
                        this.onSuccessFunctions[resourceName][i](resourceName);
                    }
                    this.onSuccessFunctions[resourceName] = [];
                };
                Localization.prototype.translate = function (resourceName, key) {
                    if (this.resources[resourceName]) {
                        return this.resources[resourceName][key];
                    }
                };
                Localization.prototype.getResources = function (resourceName) {
                    return this.resources[resourceName];
                };
                Localization.prototype.getAllResources = function () {
                    return this.resources;
                };
                Localization.prototype.isResourceLoaded = function (resourceName) {
                    return this.loadedResources[resourceName] == "loaded";
                };
                Localization.prototype.destroy = function () {
                };
                return Localization;
            }());
            localization.Localization = Localization;
        })(localization = plugins.localization || (plugins.localization = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getLocalization = function () {
        return null;
    };
    dcore.Instance.prototype.useLocalization = function (resourceLoader, defaultLanguage) {
        var that = this;
        if (that.localization) {
            that.localization.destroy();
        }
        that.localization = new dcore.plugins.localization.Localization(resourceLoader, defaultLanguage);
        that.Sandbox.prototype.getLocalization = function () {
            return that.localization;
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=localization_extension.js.map