namespace Tron {
    export class ModulesConfig {
        constructor() {
        }
        init(app: DCore) {
            app.register('GamesModule', sb => new GamesModule(sb))
                .register('TronModule', sb => new TronModule(sb));
        }
    }
}