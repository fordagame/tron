namespace Tron {
    export class PagesConfig {
        container: string[];
        app: DCore;
        constructor() {
            this.container = [];
        }

        init(app: DCore) {
            this.app = app;
            this.container["games"] = "GamesPage";
            this.container["tron"] = "TronPage";
        }

        getContainerPageTemplate(page: string, parameters: Object): string {
            var template = this.container[page];
            if (template) {
                return this.app.templates.getTemplate(this.container[page])(null);
            }
            return "";
        }
    }
}