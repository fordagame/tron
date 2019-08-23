namespace Tron {
    export class TronCoordinate {
        x: number;
        y: number;
        id: string;

        constructor() {
        }

        deserialize(json: any) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
        }
    }
}