namespace Tron {
    export enum GameType {
        Tron = 1
    }

    export class GameOptions {
        numberOfPlayers: number;
        type: GameType;
        constructor() {
        }
    }
}
