namespace Tron {
    export class BaseService {
        protected serviceUrl = "";
        private static successFunc: List<any>[];
        private static resultCache: any[];
        constructor(url) {
            this.serviceUrl = url;
            if (!BaseService.successFunc) {
                BaseService.successFunc = [];
                BaseService.resultCache = [];
            }
        }
        setTimeoutfunc(key, func: any, success: any): string {
            return "";
        }

        getData(url: string, convert: (response: string) => any, success: (result: any) => void): void {
            let key: string = this.getKey(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                app.ajax(that.url(url), <AjaxOptions>{
                    method: "Get",
                    converter: function (response: string) {
                        return response;
                    },
                    success: that.success.bind(that, key),
                    error: function (reason: any): void {
                        console.info("Error ocur in getData!");
                        console.info(reason);
                    },
                });
            }
            this.addObj(key, convert, success);
        }

        postData(key: string, url: string, convert: (response: string) => any, success: (result: any) => void, data: any) {
            key = key + this.url(url);
            if (BaseService.resultCache[key]) {
                success(convert(BaseService.resultCache[key]));
                return;
            }
            if (!BaseService.successFunc[key]) {
                var that = this;
                app.ajax(
                    that.url(url),
                    <AjaxOptions>{
                        method: "Post",
                        data: data,
                        converter: function (response: string) {
                            return response;
                        },
                        success: that.success.bind(that, key),
                        error: function (reason: any): void {
                            console.info("Error ocur in postData!");
                            console.info(reason);
                        },
                    });
            }
            this.addObj(key, convert, success);
        }

        url(url: string) {
            return this.serviceUrl + "/" + url;
        }

        getKey(obj: string): string {
            let key: string = this.serviceUrl + "/" + obj;
            return key;
        }

        addObj(key: string, convert: (response: string) => any, success: (result: any) => void) {
            if (BaseService.successFunc[key]) {
                BaseService.successFunc[key].push({ success: success, convert: convert })
            }
            else {
                BaseService.successFunc[key] = new List<any>();
                BaseService.successFunc[key].push({ success: success, convert: convert });
            }
        }

        success(key: string, result: any) {
            this.addResultCache(key, result);
            let list: List<any> = BaseService.successFunc[key];
            BaseService.successFunc[key] = null;
            for (var i = 0; i < list.objects.length; i++) {
                let obj: any = list.objects[i];
                obj.success(obj.convert(result));
            }
        }

        addResultCache(key: string, result: any) {
            BaseService.resultCache[key] = result;
            setTimeout(function () {
                delete BaseService.resultCache[key]
            }, 2000);
        }


        GeneralErrorHandle(reason: any): void {
            console.info("Error ocur: " + reason);
        }
    }
}