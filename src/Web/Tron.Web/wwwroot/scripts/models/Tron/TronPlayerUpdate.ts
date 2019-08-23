namespace Tron {
    export enum AddPlayerState {
        PlayerAdded = 1,
        GameIsFull = 2
    }
    export class TronPlayerUpdate {
        id: string;
        boardx: number;
        boardy: number;
        numberOfPlayers: number;
        state: AddPlayerState;

        constructor() {
        }

        deserialize(json: any) {
            this.id = json.id;
            this.boardx = json.boardx;
            this.boardy = json.boardy;
            this.numberOfPlayers = json.numberOfPlayers;
            this.state = json.state;
        }
    }
}