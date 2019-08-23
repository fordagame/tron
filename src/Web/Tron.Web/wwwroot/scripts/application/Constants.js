var Tron;
(function (Tron) {
    var SupportedLanguages = /** @class */ (function () {
        function SupportedLanguages() {
        }
        SupportedLanguages.Bulgarian = 0;
        SupportedLanguages.supportedLanguages = ["bg"];
        return SupportedLanguages;
    }());
    Tron.SupportedLanguages = SupportedLanguages;
    var Commands;
    (function (Commands) {
        Commands[Commands["FullData"] = 1] = "FullData";
        Commands[Commands["UpdateSubscribe"] = 2] = "UpdateSubscribe";
        Commands[Commands["UpdateUnsubscribe"] = 3] = "UpdateUnsubscribe";
        Commands[Commands["UpdateUnsubscribeAllSimilar"] = 4] = "UpdateUnsubscribeAllSimilar";
    })(Commands = Tron.Commands || (Tron.Commands = {}));
    var DataProviders;
    (function (DataProviders) {
        DataProviders[DataProviders["Messages"] = 1] = "Messages";
    })(DataProviders = Tron.DataProviders || (Tron.DataProviders = {}));
    var TronGameDirection;
    (function (TronGameDirection) {
        TronGameDirection[TronGameDirection["Up"] = 1] = "Up";
        TronGameDirection[TronGameDirection["Right"] = 2] = "Right";
        TronGameDirection[TronGameDirection["Down"] = 3] = "Down";
        TronGameDirection[TronGameDirection["Left"] = 4] = "Left";
    })(TronGameDirection = Tron.TronGameDirection || (Tron.TronGameDirection = {}));
})(Tron || (Tron = {}));
//# sourceMappingURL=Constants.js.map