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
    var GameService = /** @class */ (function (_super) {
        __extends(GameService, _super);
        function GameService() {
            return _super.call(this, "api/game") || this;
        }
        GameService.prototype.createGame = function (options, success) {
            var data = JSON.stringify({ "options": options });
            this.postData(data, "creategame", function (response) {
                return response;
            }, success, data);
        };
        return GameService;
    }(Tron.BaseService));
    Tron.GameService = GameService;
})(Tron || (Tron = {}));
//# sourceMappingURL=GameService.js.map