var Tron;
(function (Tron) {
    var BaseService = /** @class */ (function () {
        function BaseService(url) {
            this.serviceUrl = "";
            this.serviceUrl = url;
            if (!BaseService.successFunc) {
                BaseService.successFunc = [];
                BaseService.resultCache = [];
            }
        }
        BaseService.prototype.setTimeoutfunc = function (key, func, success) {
            return "";
        };
        BaseService.prototype.getData = function (url, convert, success) {
            var key = this.getKey(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                Tron.app.ajax(that.url(url), {
                    method: "Get",
                    converter: function (response) {
                        return response;
                    },
                    success: that.success.bind(that, key),
                    error: function (reason) {
                        console.info("Error ocur in getData!");
                        console.info(reason);
                    },
                });
            }
            this.addObj(key, convert, success);
        };
        BaseService.prototype.postData = function (key, url, convert, success, data) {
            key = key + this.url(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                Tron.app.ajax(that.url(url), {
                    method: "Post",
                    data: data,
                    converter: function (response) {
                        return response;
                    },
                    success: that.success.bind(that, key),
                    error: function (reason) {
                        console.info("Error ocur in postData!");
                        console.info(reason);
                    },
                });
            }
            this.addObj(key, convert, success);
        };
        BaseService.prototype.url = function (url) {
            return this.serviceUrl + "/" + url;
        };
        BaseService.prototype.getKey = function (obj) {
            var key = this.serviceUrl + "/" + obj;
            return key;
        };
        BaseService.prototype.addObj = function (key, convert, success) {
            if (BaseService.successFunc[key]) {
                BaseService.successFunc[key].push({ success: success, convert: convert });
            }
            else {
                BaseService.successFunc[key] = new Tron.List();
                BaseService.successFunc[key].push({ success: success, convert: convert });
            }
        };
        BaseService.prototype.success = function (key, result) {
            this.addResultCache(key, result);
            var list = BaseService.successFunc[key];
            BaseService.successFunc[key] = null;
            for (var i = 0; i < list.objects.length; i++) {
                var obj = list.objects[i];
                obj.success(obj.convert(result));
            }
        };
        BaseService.prototype.addResultCache = function (key, result) {
            BaseService.resultCache[key] = result;
            setTimeout(function () {
                delete BaseService.resultCache[key];
            }, 2000);
        };
        BaseService.prototype.GeneralErrorHandle = function (reason) {
            console.info("Error ocur: " + reason);
        };
        return BaseService;
    }());
    Tron.BaseService = BaseService;
})(Tron || (Tron = {}));
//# sourceMappingURL=BaseService.js.map