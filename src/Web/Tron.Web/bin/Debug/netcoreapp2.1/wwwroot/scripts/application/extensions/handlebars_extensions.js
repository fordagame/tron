var Tron;
(function (Tron) {
    Handlebars.registerHelper('translate', function (resourceName, key) {
        return Tron.app.localization.translate(resourceName, key);
    });
})(Tron || (Tron = {}));
//# sourceMappingURL=handlebars_extensions.js.map