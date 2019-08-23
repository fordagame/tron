namespace Tron {
    export class ServiceConfig {
        webSocket: WebSocketService;
        constructor() {
        }
        init(app: DCore) {
            if (!this.webSocket) {
                this.webSocket = new WebSocketService(app);
            }

            app.services.add<CookieService>('cookies', () => new CookieService())
                .add<DependencyService>('dependency', () => new DependencyService(Tron.app.dependency))
                .add<WebSocketService>('websocket', () => this.webSocket)
                .add<GameService>('game', () => new GameService())
                .add<UsersService>('users', () => new UsersService(app));
        }
    }
}