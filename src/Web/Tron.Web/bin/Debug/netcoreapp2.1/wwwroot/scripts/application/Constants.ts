namespace Tron {
    export class SupportedLanguages {
        static Bulgarian: number = 0;
        static supportedLanguages: string[] = ["bg"];
    }

    export enum Commands {
        FullData = 1,
        UpdateSubscribe = 2,
        UpdateUnsubscribe = 3,
        UpdateUnsubscribeAllSimilar = 4
    }

    export enum DataProviders {
        Messages = 1
    }

    export enum TronGameDirection {
        Up = 1,
        Right = 2,
        Down = 3,
        Left = 4
    }
}