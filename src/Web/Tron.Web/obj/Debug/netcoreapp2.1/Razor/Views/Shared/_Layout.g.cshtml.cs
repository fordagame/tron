#pragma checksum "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "2cec8bb56332b53c71ec8c1e7f7fd81a2cacb775"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__Layout), @"mvc.1.0.view", @"/Views/Shared/_Layout.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Shared/_Layout.cshtml", typeof(AspNetCore.Views_Shared__Layout))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\_ViewImports.cshtml"
using Tron.Web;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2cec8bb56332b53c71ec8c1e7f7fd81a2cacb775", @"/Views/Shared/_Layout.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ac937faaf933f60ce6a670c8a5aa7e99d818e24b", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__Layout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 25, true);
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            EndContext();
            BeginContext(25, 652, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "3b3c11bbcfec431c91cee6085cdbd53a", async() => {
                BeginContext(31, 57, true);
                WriteLiteral("\r\n    <script type=\"text/javascript\">\r\n        version = ");
                EndContext();
                BeginContext(89, 18, false);
#line 5 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
             Write(BasePage.JsVersion);

#line default
#line hidden
                EndContext();
                BeginContext(107, 159, true);
                WriteLiteral("\r\n    </script>\r\n    <meta charset=\"utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Tron</title>\r\n    <link");
                EndContext();
                BeginWriteAttribute("href", " href=\"", 266, "\"", 324, 2);
                WriteAttributeValue("", 273, "/styles/bundle.min.css?version=", 273, 31, true);
#line 10 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
WriteAttributeValue("", 304, BasePage.CssVersion, 304, 20, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(325, 33, true);
                WriteLiteral(" rel=\"stylesheet\" />\r\n    <script");
                EndContext();
                BeginWriteAttribute("src", " src=\"", 358, "\"", 410, 2);
                WriteAttributeValue("", 364, "/lib/frameworks.js?version=", 364, 27, true);
#line 11 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
WriteAttributeValue("", 391, BasePage.JsVersion, 391, 19, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(411, 46, true);
                WriteLiteral(" type=\"text/javascript\"></script>\r\n    <script");
                EndContext();
                BeginWriteAttribute("src", " src=\"", 457, "\"", 524, 2);
                WriteAttributeValue("", 463, "/Templates/templatesbundle.min.js?version=", 463, 42, true);
#line 12 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
WriteAttributeValue("", 505, BasePage.JsVersion, 505, 19, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(525, 46, true);
                WriteLiteral(" type=\"text/javascript\"></script>\r\n    <script");
                EndContext();
                BeginWriteAttribute("src", " src=\"", 571, "\"", 634, 2);
                WriteAttributeValue("", 577, "/scripts/applicationbundle.js?version=", 577, 38, true);
#line 13 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
WriteAttributeValue("", 615, BasePage.JsVersion, 615, 19, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(635, 35, true);
                WriteLiteral(" type=\"text/javascript\"></script>\r\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(677, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            BeginContext(679, 79, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "253a145f3c7e41cab1c6be8449938e38", async() => {
                BeginContext(685, 39, true);
                WriteLiteral("\r\n    <div id=\"body-content\">\r\n        ");
                EndContext();
                BeginContext(725, 12, false);
#line 17 "F:\Projects\Tron\Tron\src\web\Tron.Web\Views\Shared\_Layout.cshtml"
   Write(RenderBody());

#line default
#line hidden
                EndContext();
                BeginContext(737, 14, true);
                WriteLiteral("\r\n    </div>\r\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(758, 11, true);
            WriteLiteral("\r\n</html>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
