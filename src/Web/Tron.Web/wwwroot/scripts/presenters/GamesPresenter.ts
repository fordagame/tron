namespace Tron {
    export class GamesPresenter extends dcore.plugins.mvp.Presenter<GamesView, any> {
        protected sandbox: DSandbox;
        constructor(sb, view: GamesView) {
            super(view);
            this.sandbox = sb;
        }

        getName() {
            let user: User = this.sandbox.getService<UsersService>("users").getUser();
            return user.name;
        }

        createGame(numberOfPlayers: number) {
            let options: GameOptions = new GameOptions();
            options.numberOfPlayers = numberOfPlayers;
            options.type = GameType.Tron;
            let gameService: GameService = this.sandbox.getService<GameService>("game");
            gameService.createGame(options, this.gameCreated.bind(this));
        }

        gameCreated(gameId: string) {
            window.location.hash = "#tron/" + gameId;
        }
    }
}