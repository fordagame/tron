namespace Tron {
    export class BaseModule implements DModule {
        sandbox: DSandbox;
        root: HTMLElement;
        subscriptionTokens: DSubscriptionToken[];

        constructor(sb: DSandbox) {
            this.sandbox = sb;
            this.subscriptionTokens = [];
        }

        init(options: Object) {
        }

        destroy() {
            this.removeEvents();
        }

        addEventToken(token: DSubscriptionToken) {
            this.subscriptionTokens.push(token);
        }

        removeEvents() {
            for (var i in this.subscriptionTokens) {
                var subscriptionToken = this.subscriptionTokens[i];
                subscriptionToken.destroy();
            }
        }
    }
}