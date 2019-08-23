namespace Tron {
    export class WebSocketMessage {
        type: string;
        data: string;

        constructor() {
        }

        deserialize(json: any) {
            this.type = json.type;
            this.data = json.data;
        }
    }
}