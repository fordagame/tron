using System;

namespace Tron.Web
{
    public class BasePage
    {
        static BasePage()
        {
            jsVer = cssVer = DateTime.Now.ToString("ddMMyyyyhhmm");
        }
        private static string cssVer = "";
        public static string CssVersion
        {
            get
            {
                return cssVer;
            }
        }

        private static string jsVer = null;
        public static string JsVersion
        {
            get
            {
                return jsVer;
            }
        }
    }
}
