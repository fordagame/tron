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
var Tron;
(function (Tron) {
    var User = /** @class */ (function () {
        function User() {
        }
        return User;
    }());
    Tron.User = User;
})(Tron || (Tron = {}));
//# sourceMappingURL=User.js.map
var Tron;
(function (Tron) {
    var GameType;
    (function (GameType) {
        GameType[GameType["Tron"] = 1] = "Tron";
    })(GameType = Tron.GameType || (Tron.GameType = {}));
    var GameOptions = /** @class */ (function () {
        function GameOptions() {
        }
        return GameOptions;
    }());
    Tron.GameOptions = GameOptions;
})(Tron || (Tron = {}));
//# sourceMappingURL=GameOptions.js.map
var Tron;
(function (Tron) {
    var WebSocketMessage = /** @class */ (function () {
        function WebSocketMessage() {
        }
        WebSocketMessage.prototype.deserialize = function (json) {
            this.type = json.type;
            this.data = json.data;
        };
        return WebSocketMessage;
    }());
    Tron.WebSocketMessage = WebSocketMessage;
})(Tron || (Tron = {}));
//# sourceMappingURL=WebSocketMessage.js.map
var Tron;
(function (Tron) {
    var TronCoordinate = /** @class */ (function () {
        function TronCoordinate() {
        }
        TronCoordinate.prototype.deserialize = function (json) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
        };
        return TronCoordinate;
    }());
    Tron.TronCoordinate = TronCoordinate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronCoordinate.js.map
var Tron;
(function (Tron) {
    var TronPlayer = /** @class */ (function () {
        function TronPlayer() {
        }
        TronPlayer.prototype.deserialize = function (json) {
            this.x = json.x;
            this.y = json.y;
            this.id = json.id;
            this.alive = json.alive;
            this.position = json.position;
            this.name = json.name;
        };
        return TronPlayer;
    }());
    Tron.TronPlayer = TronPlayer;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronPlayer.js.map
var Tron;
(function (Tron) {
    var AddPlayerState;
    (function (AddPlayerState) {
        AddPlayerState[AddPlayerState["PlayerAdded"] = 1] = "PlayerAdded";
        AddPlayerState[AddPlayerState["GameIsFull"] = 2] = "GameIsFull";
    })(AddPlayerState = Tron.AddPlayerState || (Tron.AddPlayerState = {}));
    var TronPlayerUpdate = /** @class */ (function () {
        function TronPlayerUpdate() {
        }
        TronPlayerUpdate.prototype.deserialize = function (json) {
            this.id = json.id;
            this.boardx = json.boardx;
            this.boardy = json.boardy;
            this.numberOfPlayers = json.numberOfPlayers;
            this.state = json.state;
        };
        return TronPlayerUpdate;
    }());
    Tron.TronPlayerUpdate = TronPlayerUpdate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronPlayerUpdate.js.map
var Tron;
(function (Tron) {
    var GameState;
    (function (GameState) {
        GameState[GameState["WaitingForPlayers"] = 1] = "WaitingForPlayers";
        GameState[GameState["Started"] = 2] = "Started";
        GameState[GameState["Ended"] = 3] = "Ended";
    })(GameState = Tron.GameState || (Tron.GameState = {}));
    var TronGameUpdate = /** @class */ (function () {
        function TronGameUpdate() {
            this.players = [];
            this.newCoordinates = [];
            this.lastCoordinates = [];
        }
        TronGameUpdate.prototype.deserialize = function (json) {
            this.winnerName = json.winnerName;
            this.state = json.state;
            this.players = [];
            if (json.players) {
                for (var i = 0; i < json.players.length; i++) {
                    var player = new Tron.TronPlayer();
                    player.deserialize(json.players[i]);
                    this.players[i] = player;
                }
            }
            this.lastCoordinates = [];
            if (json.lastCoordinates) {
                for (var i = 0; i < json.lastCoordinates.length; i++) {
                    var coordinate = new Tron.TronCoordinate();
                    coordinate.deserialize(json.lastCoordinates[i]);
                    this.lastCoordinates[i] = coordinate;
                }
            }
            this.newCoordinates = [];
            if (json.newCoordinates) {
                for (var i = 0; i < json.newCoordinates.length; i++) {
                    var coordinate = new Tron.TronCoordinate();
                    coordinate.deserialize(json.newCoordinates[i]);
                    this.newCoordinates[i] = coordinate;
                }
            }
        };
        return TronGameUpdate;
    }());
    Tron.TronGameUpdate = TronGameUpdate;
})(Tron || (Tron = {}));
//# sourceMappingURL=TronGameUpdate.js.map