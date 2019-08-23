var handlebars_extensions;
(function (handlebars_extensions) {
    Handlebars.registerHelper('isChecked', function (condition) {
        return condition ? "checked" : "";
    });
    Handlebars.registerHelper('isNotChecked', function (condition) {
        return !condition ? "checked" : "";
    });
    Handlebars.registerHelper('isCheckedValue', function (currentValue, value) {
        return currentValue == value ? "checked" : "";
    });
    Handlebars.registerHelper('isSelected', function (value, selectValue) {
        return value == selectValue ? "selected" : "";
    });
    Handlebars.registerHelper('lower', function (value, selectValue, cssClass) {
        return value < selectValue ? cssClass : "";
    });
    Handlebars.registerHelper('equal', function (value, selectValue, cssClass) {
        return value == selectValue ? cssClass : "";
    });
    Handlebars.registerHelper('not', function (conditional, options) {
        if (!conditional) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    Handlebars.registerHelper('ifIsEqual', function (value, selectedValue, options) {
        if (value == selectedValue) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
})(handlebars_extensions || (handlebars_extensions = {}));
//# sourceMappingURL=handlebars_extensions.js.map