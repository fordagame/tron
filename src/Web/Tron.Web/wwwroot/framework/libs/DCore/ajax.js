var dcore;
(function (dcore) {
    "use strict";
    dcore.DefaultSandbox.prototype.ajax = function (url, options) {
        return null;
    };
    dcore.Instance.prototype.useAjax = function () {
        var that = this;
        if (that.ajax) {
            return;
        }
        that.ajax = function (url, options) {
            var request = {
                method: options.method || "GET",
                contentType: options.contentType || "application/json",
                responseType: options.responseType || "",
                converter: options.converter || function (response) { return response; },
                success: options.success,
                error: options.error || function (reason) { return; },
                data: options.data || "",
            };
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, url, true);
            if (request.contentType != "empty") {
                xhr.setRequestHeader("Content-type", request.contentType);
            }
            xhr.responseType = request.responseType;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.responseURL && xhr.responseURL.indexOf("Account/Login") != -1) {
                        window.location.href = "/Account/Login";
                    }
                    switch (xhr.status) {
                        case 200:
                            request.success(request.converter(xhr.responseText));
                            break;
                        default:
                            request.error("Service error.");
                            break;
                    }
                }
            };
            xhr.send(request.data);
        };
        that.Sandbox.prototype.ajax = function (url, options) {
            return this["core"].ajax(url, options);
        };
    };
})(dcore || (dcore = {}));
//# sourceMappingURL=ajax.js.map