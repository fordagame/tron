namespace Tron {
    export class ResolverTypes {
        public static readonly Resource: string = "ResourceResolver";
        public static readonly Template: string = "TemplateResolver";
    }

    export class Dependency implements IDependency {
        name: string;
        options: Object;
    }

    export class ResourceResolver implements IConcreteDependencyResolver {
        resolve(dependencyOptions: any, success: () => void): void {
            let resourceName: string = dependencyOptions.resourceName;
            if (Tron.app.localization.isResourceLoaded(resourceName)) {
                success();
            }
            else {
                Tron.app.localization.loadResource(resourceName, success);
            }
        }
    }

    export class TemplateResolver implements IConcreteDependencyResolver {
        resolve(dependencyOptions: any, success: () => void): void {
            app.templates.loadTemplates(success);
        }
    }
}