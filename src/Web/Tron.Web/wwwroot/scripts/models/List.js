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
var Tron;
(function (Tron) {
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(objects) {
            if (objects === void 0) { objects = []; }
            var _this = _super.call(this) || this;
            if (objects) {
                _this.objects = objects;
            }
            return _this;
        }
        List.prototype.pushRange = function (list) {
            this.objects = this.objects.concat(list.objects);
        };
        List.prototype.push = function (obj) {
            this.objects.push(obj);
        };
        List.prototype.pop = function () {
            return this.objects.pop();
        };
        return List;
    }(Tron.app.mvp.Model));
    Tron.List = List;
})(Tron || (Tron = {}));
//# sourceMappingURL=List.js.map