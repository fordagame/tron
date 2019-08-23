namespace Tron {
    export class TronModule extends BaseModule {
        root: HTMLElement;
        presenter: TronPresenter;
        isCreate: boolean;
        gameId: string;
        wsSubscriptions: any[];

        constructor(sb: DSandbox) {
            super(sb);
        }
        
        init(options: Object) {
            super.init(options);
            let dependencyService: DependencyService = this.sandbox.getService<DependencyService>("dependency");
            dependencyService.addResourceDepndency("application");
            dependencyService.addResourceDepndency("tron");
            dependencyService.executeDependencies(this.initRequirements.bind(this, options));
        }

        initRequirements(options: Object, status: boolean, errorMessage: string) {
            this.presenter = new TronPresenter(this.sandbox, new TronView(this.sandbox.getTemplate("TronModule")));
            this.presenter.view.presenter = this.presenter;
            this.presenter.gameId = this.gameId = options["parameters"]["gameId"];
            let userService: UsersService = this.sandbox.getService<UsersService>("users");
            let socket: WebSocketService = this.sandbox.getService<WebSocketService>("websocket");

            this.wsSubscriptions = [];

            let playerUpdateSubscription: any = this.receivePlayerDataUpdate.bind(this);
            this.wsSubscriptions["PlayerData"] = playerUpdateSubscription;

            let gameUpdateSubscription: any = this.receiveGameDataUpdate.bind(this);
            this.wsSubscriptions["GameUpdate"] = gameUpdateSubscription;

            for (var i in this.wsSubscriptions) {
                socket.subscribeForMessage(i, this.wsSubscriptions[i]);
            }

            socket.addPlayer(this.gameId, userService.getUser().name);
            this.root = options["root"];
            this.root.innerHTML = "";
            this.root.appendChild(this.presenter.render());
        }

        receivePlayerDataUpdate(message: WebSocketMessage) {
            let update: TronPlayerUpdate = new TronPlayerUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameData(update);
        }

        receiveGameDataUpdate(message: WebSocketMessage) {
            let update: TronGameUpdate = new TronGameUpdate();
            update.deserialize(message.data);
            this.presenter.updateGameState(update);
        }

        destroy() {
            super.destroy();
            this.presenter.destroy();
            let socket: WebSocketService = this.sandbox.getService<WebSocketService>("websocket");
            for (var i in this.wsSubscriptions) {
                socket.unsubscribeForMessage(i, this.wsSubscriptions[i]);
            }
        }
    }
}