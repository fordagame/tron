var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var dependency;
        (function (dependency) {
            var DependencyLoader = /** @class */ (function () {
                function DependencyLoader(concreteResolvers) {
                    this.loadedDependencies = [];
                    this.concreteResolvers = concreteResolvers;
                }
                DependencyLoader.prototype.require = function (dependencies, success) {
                    if (dependencies.length == 0) {
                        success(true, "");
                    }
                    else {
                        var dependencny = dependencies.pop();
                        var that_1 = this;
                        var concreteResolver = this.concreteResolvers[dependencny.name];
                        if (concreteResolver) {
                            concreteResolver.resolve(dependencny.options, function () {
                                that_1.require(dependencies, success);
                            });
                        }
                        else {
                            success(false, "Depdencny resolver for " + dependencny.name + " was not found");
                        }
                    }
                };
                DependencyLoader.prototype.destroy = function () {
                };
                return DependencyLoader;
            }());
            dependency.DependencyLoader = DependencyLoader;
        })(dependency = plugins.dependency || (plugins.dependency = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getDependencyLoader = function () {
        return null;
    };
    dcore.Instance.prototype.useDependencyLoader = function (concreteResolvers) {
        var that = this;
        if (that.dependency) {
            that.dependency.destroy();
        }
        that.dependency = new dcore.plugins.dependency.DependencyLoader(concreteResolvers);
        that.Sandbox.prototype.getDependencyLoader = function () {
            return that.dependency;
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=dependency_loader_extension.js.map