namespace Tron {
    export class TronView extends app.mvpExt.baseView {
        presenter: TronPresenter;
        boardX: number;
        boardY: number
        keyHandler: any;
        constructor(template?: (model: any) => string) {
            super(document.createElement('div'), template);
            this.keyHandler = this.handle_move.bind(this);
            document.addEventListener("keypress", this.keyHandler, true);
        }

        render(model: any): HTMLElement {
            let root = super.render(model);
            return root;
        }

        handle_move(ev: KeyboardEvent) {
            switch (ev.which) {
                case 100:
                    this.presenter.updateDirection(TronGameDirection.Right);
                    break;
                case 115:
                    this.presenter.updateDirection(TronGameDirection.Down);
                    break;
                case 97:
                    this.presenter.updateDirection(TronGameDirection.Left);
                    break;
                case 119:
                    this.presenter.updateDirection(TronGameDirection.Up);
                    break;
            }
        }

        colors: string[] = ["orange", "blue", "green", "purple"];
        currentColors: string[] = ["darkorange", "darkblue", "darkgreen", "darkwhite"];
        drawInCanvas(x: number, y: number, position: number, current: boolean) {
            let mycanvas: HTMLCanvasElement = <HTMLCanvasElement>this.root.querySelector('#tron_game');
            let ctx: CanvasRenderingContext2D = mycanvas.getContext('2d');
            ctx.fillStyle = current ? "red" : this.colors[position];
            let squareXSize: number = mycanvas.width / this.boardX;
            let squareYSize: number = mycanvas.height / this.boardY;
            ctx.fillRect(x * squareXSize, y * squareYSize, squareXSize, squareYSize);
        }

        setGameData(state: TronPlayerUpdate) {
            this.boardX = state.boardx;
            this.boardY = state.boardy;
        }

        updatePlayers(players: TronPlayer[]) {
            let playersContainer: HTMLElement = this.root.querySelector("#activePlayers");
            playersContainer.innerHTML = "";
            for (var i = 0; i < players.length; i++) {
                let playerContainer: HTMLElement = document.createElement("div");
                playersContainer.appendChild(playerContainer);
                playerContainer.innerHTML = players[i].name;
                playerContainer.style.color = this.colors[players[i].position - 1];
            }
        }

        destroy() {
            document.removeEventListener("keypress", this.keyHandler, true);
            super.destroy();
        }
    }
}