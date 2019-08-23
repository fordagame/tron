var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var templates;
        (function (templates) {
            var TemplateResolver = /** @class */ (function () {
                function TemplateResolver(templateDictionary, templateNameFormat) {
                    this.templates = [];
                    this.templateDictionary = templateDictionary;
                    this.templateNameFormat = templateNameFormat;
                }
                TemplateResolver.prototype.getTemplate = function (templateName) {
                    if (!this.templates[templateName]) {
                        this.templates[templateName] = this.templateDictionary[this.templateNameFormat(templateName)];
                    }
                    return this.templates[templateName];
                };
                TemplateResolver.prototype.loadTemplates = function (success) {
                    success();
                };
                TemplateResolver.prototype.destroy = function () {
                    this.templates = [];
                };
                return TemplateResolver;
            }());
            templates.TemplateResolver = TemplateResolver;
        })(templates = plugins.templates || (plugins.templates = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    dcore.DefaultSandbox.prototype.getTemplate = function (templateName) {
        return null;
    };
    dcore.Instance.prototype.useTemplateResolver = function (templateResolver) {
        var that = this;
        if (that.templates) {
            that.templates.destroy();
        }
        that.templates = templateResolver;
        that.Sandbox.prototype.getTemplate = function (templateName) {
            return that.templates.getTemplate(templateName);
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=templates_extensions.js.map