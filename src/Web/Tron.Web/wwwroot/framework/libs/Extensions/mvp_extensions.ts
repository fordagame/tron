interface IBaseView {
    render(model: any): HTMLElement;
}

namespace dcore.plugins.mvp_extension {
    export class BaseView extends dcore.plugins.mvp.View implements IBaseView {
        protected template: (model: any) => string;

        constructor(root: HTMLElement, template?: (model: any) => string) {
            super(root)

            this.template = template;
        }

        /**
         *  Renders the view.
         *  @returns {HTMLElement}
         */
        render(model: any): HTMLElement {
            let root: HTMLElement = super.render(model);
            if (this.template) {
                root.innerHTML = this.template.call(this, model);
            }
            return root;
        }
    }
}

interface IBaseModel {
}

namespace dcore.plugins.mvp_extension {
    export class BaseModel extends dcore.plugins.mvp.Model implements IBaseModel {
        constructor() {
            super();
        }
    }
}

interface DCore {
    useMVPExtended(): void;
    mvpExt: MVPPluginExtension;
}

interface MVPPluginExtension {
    baseView: typeof dcore.plugins.mvp_extension.BaseView
    baseModel: typeof dcore.plugins.mvp_extension.BaseModel
}

namespace dcore {
    "use strict";

    import mvpExtView = plugins.mvp_extension;
    import mvpExtModel = plugins.mvp_extension;

    export interface Instance {
        useMVPExtended(): void;
        mvpExt: MVPPluginExtension;
    }
    Instance.prototype.useMVPExtended = function (): void {
        let that = <DCore>this;
        if (that.mvpExt) {
            return;
        }
        that.mvpExt = {
            baseView: mvpExtView.BaseView,
            baseModel: mvpExtModel.BaseModel
        }
    };
}