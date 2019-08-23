namespace Tron {
    export enum GameState {
        WaitingForPlayers = 1,
        Started = 2,
        Ended = 3
    }
    export class TronGameUpdate {
        players: TronPlayer[];
        newCoordinates: TronCoordinate[];
        lastCoordinates: TronCoordinate[];
        winnerName: string;
        state: GameState;

        constructor() {
            this.players = [];
            this.newCoordinates = [];
            this.lastCoordinates = [];
        }

        deserialize(json: any) {
            this.winnerName = json.winnerName;
            this.state = json.state;
            this.players = [];
            if (json.players) {
                for (var i = 0; i < json.players.length; i++) {
                    let player: TronPlayer = new TronPlayer();
                    player.deserialize(json.players[i]);
                    this.players[i] = player;
                }
            }

            this.lastCoordinates = [];
            if (json.lastCoordinates) {
                for (var i = 0; i < json.lastCoordinates.length; i++) {
                    let coordinate: TronCoordinate = new TronCoordinate();
                    coordinate.deserialize(json.lastCoordinates[i]);
                    this.lastCoordinates[i] = coordinate;
                }
            }

            this.newCoordinates = [];
            if (json.newCoordinates) {
                for (var i = 0; i < json.newCoordinates.length; i++) {
                    let coordinate: TronCoordinate = new TronCoordinate();
                    coordinate.deserialize(json.newCoordinates[i]);
                    this.newCoordinates[i] = coordinate;
                }
            }
        }
    }
}