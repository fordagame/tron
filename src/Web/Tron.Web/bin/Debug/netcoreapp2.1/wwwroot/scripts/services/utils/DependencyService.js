var Tron;
(function (Tron) {
    var DependencyService = /** @class */ (function () {
        function DependencyService(dependencyLoader) {
            this.dependencyLoader = dependencyLoader;
            this.dependencies = [];
        }
        DependencyService.prototype.addResourceDepndency = function (resourceName) {
            var dependency = new Tron.Dependency();
            dependency.name = Tron.ResolverTypes.Resource;
            dependency.options = {
                resourceName: resourceName
            };
            this.dependencies.push(dependency);
        };
        DependencyService.prototype.loadTemplateDependency = function () {
            var dependency = new Tron.Dependency();
            dependency.name = Tron.ResolverTypes.Template;
            dependency.options = {};
            this.dependencies.push(dependency);
        };
        DependencyService.prototype.executeDependencies = function (success) {
            this.dependencyLoader.require(this.dependencies, success);
        };
        DependencyService.prototype.clear = function () {
            this.dependencies = [];
        };
        return DependencyService;
    }());
    Tron.DependencyService = DependencyService;
})(Tron || (Tron = {}));
//# sourceMappingURL=DependencyService.js.map