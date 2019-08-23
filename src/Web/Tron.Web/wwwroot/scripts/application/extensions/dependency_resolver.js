var Tron;
(function (Tron) {
    var ResolverTypes = /** @class */ (function () {
        function ResolverTypes() {
        }
        ResolverTypes.Resource = "ResourceResolver";
        ResolverTypes.Template = "TemplateResolver";
        return ResolverTypes;
    }());
    Tron.ResolverTypes = ResolverTypes;
    var Dependency = /** @class */ (function () {
        function Dependency() {
        }
        return Dependency;
    }());
    Tron.Dependency = Dependency;
    var ResourceResolver = /** @class */ (function () {
        function ResourceResolver() {
        }
        ResourceResolver.prototype.resolve = function (dependencyOptions, success) {
            var resourceName = dependencyOptions.resourceName;
            if (Tron.app.localization.isResourceLoaded(resourceName)) {
                success();
            }
            else {
                Tron.app.localization.loadResource(resourceName, success);
            }
        };
        return ResourceResolver;
    }());
    Tron.ResourceResolver = ResourceResolver;
    var TemplateResolver = /** @class */ (function () {
        function TemplateResolver() {
        }
        TemplateResolver.prototype.resolve = function (dependencyOptions, success) {
            Tron.app.templates.loadTemplates(success);
        };
        return TemplateResolver;
    }());
    Tron.TemplateResolver = TemplateResolver;
})(Tron || (Tron = {}));
//# sourceMappingURL=dependency_resolver.js.map