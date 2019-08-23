namespace Tron {
    export class TronPlayer {
        id: string;
        name: string;
        x: number;
        y: number;
        alive: boolean;
        position: number;
        constructor() {
        }

        deserialize(json: any) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
            this.alive = json.alive;
            this.position = json.position;
            this.name = json.name;
        }
    }
}