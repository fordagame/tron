namespace Tron {
    Handlebars.registerHelper('translate', function (resourceName: string, key: string): string {
        return Tron.app.localization.translate(resourceName, key);
    });
}