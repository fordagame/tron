namespace Tron {
    export class TronPresenter extends dcore.plugins.mvp.Presenter<TronView, any> {
        protected sandbox: DSandbox;
        gameId: string;
        playerGameData: TronPlayerUpdate;
        players: TronPlayer[];
        constructor(sb, view: TronView) {
            super(view);
            this.sandbox = sb;
            this.players = [];
        }

        destroy() {
            this.view.destroy();
        }

        updateDirection(direction: TronGameDirection) {
            let socket: WebSocketService = this.sandbox.getService<WebSocketService>("websocket");
            socket.updateGameState(this.gameId, <number>direction);
        }

        updateGameData(state: TronPlayerUpdate) {
            this.playerGameData = state;
            this.view.setGameData(state);
        }

        updateGameState(state: TronGameUpdate) {
            if (state.state == GameState.WaitingForPlayers) {
                let oldPlayersCount = this.players.length;
                if (oldPlayersCount != state.players.length) {
                    this.players = state.players;
                    this.view.updatePlayers(this.players);
                }
            }

            if (state.state > GameState.WaitingForPlayers) {
                var positions: number[] = [];
                for (var i = 0; i < this.players.length; i++) {
                    positions[this.players[i].id] = this.players[i].position;
                }
                for (var i = 0; i < state.newCoordinates.length; i++) {
                    this.view.drawInCanvas(state.lastCoordinates[i].x, state.lastCoordinates[i].y, positions[state.lastCoordinates[i].id] - 1, false);
                }
                for (var i = 0; i < state.newCoordinates.length; i++)
                {
                    this.view.drawInCanvas(state.newCoordinates[i].x, state.newCoordinates[i].y, positions[state.newCoordinates[i].id] - 1, true);
                }
            }
            if (state.state == GameState.Ended) {
                alert(state.winnerName);
            }
        }
    }
}