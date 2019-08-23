namespace Tron {
    export class GamesView extends app.mvpExt.baseView {
        presenter: GamesPresenter;
        constructor(template?: (model: any) => string) {
            super(document.createElement('div'), template);

            this.addEventListener({
                type: "click",
                selector: "#create_tron_game",
                listener: this.create_tron_game
            });
        }

        render(model: any): HTMLElement {
            let root = super.render(model);
            let nameContainer: HTMLElement = this.root.querySelector("#playerName");
            nameContainer.innerHTML = this.presenter.getName();
            return root;
        }

        create_tron_game() {
            let numberOfPlayersSelect: HTMLSelectElement = <HTMLSelectElement>this.root.querySelector("#numberOfPlayers");
            this.presenter.createGame(parseInt(numberOfPlayersSelect.value));
        }
    }
}