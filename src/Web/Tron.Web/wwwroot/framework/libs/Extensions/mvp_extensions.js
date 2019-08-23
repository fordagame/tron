var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dcore;
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp_extension;
        (function (mvp_extension) {
            var BaseView = /** @class */ (function (_super) {
                __extends(BaseView, _super);
                function BaseView(root, template) {
                    var _this = _super.call(this, root) || this;
                    _this.template = template;
                    return _this;
                }
                /**
                 *  Renders the view.
                 *  @returns {HTMLElement}
                 */
                BaseView.prototype.render = function (model) {
                    var root = _super.prototype.render.call(this, model);
                    if (this.template) {
                        root.innerHTML = this.template.call(this, model);
                    }
                    return root;
                };
                return BaseView;
            }(dcore.plugins.mvp.View));
            mvp_extension.BaseView = BaseView;
        })(mvp_extension = plugins.mvp_extension || (plugins.mvp_extension = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    var plugins;
    (function (plugins) {
        var mvp_extension;
        (function (mvp_extension) {
            var BaseModel = /** @class */ (function (_super) {
                __extends(BaseModel, _super);
                function BaseModel() {
                    return _super.call(this) || this;
                }
                return BaseModel;
            }(dcore.plugins.mvp.Model));
            mvp_extension.BaseModel = BaseModel;
        })(mvp_extension = plugins.mvp_extension || (plugins.mvp_extension = {}));
    })(plugins = dcore.plugins || (dcore.plugins = {}));
})(dcore || (dcore = {}));
(function (dcore) {
    "use strict";
    var mvpExtView = dcore.plugins.mvp_extension;
    var mvpExtModel = dcore.plugins.mvp_extension;
    dcore.Instance.prototype.useMVPExtended = function () {
        var that = this;
        if (that.mvpExt) {
            return;
        }
        that.mvpExt = {
            baseView: mvpExtView.BaseView,
            baseModel: mvpExtModel.BaseModel
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=mvp_extensions.js.map