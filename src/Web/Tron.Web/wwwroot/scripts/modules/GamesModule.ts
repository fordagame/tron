namespace Tron {
    export class GamesModule extends BaseModule {
        root: HTMLElement;
        presenter: GamesPresenter;
        isCreate: boolean;
        constructor(sb: DSandbox) {
            super(sb);
        }

        init(options: Object) {
            super.init(options);
            let dependencyService: DependencyService = this.sandbox.getService<DependencyService>("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("games");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        }

        initRequirements(options: Object, status: boolean, errorMessage: string) {
            this.presenter = new GamesPresenter(this.sandbox, new GamesView(this.sandbox.getTemplate("GamesModule")));
            this.presenter.view.presenter = this.presenter;
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        }

        destroy() {
            super.destroy();
            this.presenter.destroy();
        }
    }
}