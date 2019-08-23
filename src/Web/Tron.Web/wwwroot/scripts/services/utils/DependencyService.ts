namespace Tron {
    export class DependencyService {
        private dependencies: IDependency[];
        dependencyLoader: IDependencyLoader;
        constructor(dependencyLoader: IDependencyLoader) {
            this.dependencyLoader = dependencyLoader;
            this.dependencies = [];
        }

        addResourceDepndency(resourceName: string) {
            let dependency: Dependency = new Dependency();
            dependency.name = ResolverTypes.Resource;
            dependency.options = {
                resourceName: resourceName
            };
            this.dependencies.push(dependency);
        }

        loadTemplateDependency() {
            let dependency: Dependency = new Dependency();
            dependency.name = ResolverTypes.Template;
            dependency.options = {
            };
            this.dependencies.push(dependency);
        }

        executeDependencies(success: (status: boolean, errorMessage: string) => void) {
            this.dependencyLoader.require(this.dependencies, success);
        }

        clear() {
            this.dependencies = [];
        }
    }
}