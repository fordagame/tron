namespace Tron {
    export class GameService extends BaseService {
        constructor() {
            super("api/game");
        }

        createGame(options: GameOptions, success: (result: string) => void): void {
            var data: string = JSON.stringify({ "options": options });
            this.postData(data, "creategame",
                function (response: string): string {
                    return response;
                }, success, data);
        }
    }
}