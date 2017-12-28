using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace LegalAssistance
{
    public class BundleConfig
    {
        const string distFolder = "~/ngApp/dist/{0}";

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/base")
                .IncludeDirectory("~/Scripts/vendor/base", "*.js", true)
                .IncludeDirectory("~/Scripts/site", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/document")
                .IncludeDirectory("~/Scripts/vendor/document", "*.js", true)
                .IncludeDirectory("~/Scripts/app", "*.js", true));

            bundles.Add(new StyleBundle("~/Content/Styles/base").Include(                                      
                      "~/Content/Styles/bootstrap.css",
                      "~/Content/Styles/style.css",
                      "~/Content/Styles/swiper.css",
                      "~/Content/Styles/dark.css",
                      "~/Content/Styles/font-icons.css",
                      "~/Content/Styles/animate.css",
                      "~/Content/Styles/magnific-popup.css",
                      "~/Content/Styles/responsive.css",
                      "~/Content/Styles/components/radio-checkbox.css",
                      "~/Content/Styles/datepicker.css",
                      "~/Content/Styles/site/*.css"));

            //RegisterDocsBundles(bundles);
#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }        

        /// <summary>
        /// Register bundle for every *.docx file
        /// </summary>
        /// <param name="bundles"></param>
        private static void RegisterDocsBundles(BundleCollection bundles)
        {
            //Register bundle for common files for every doc
            bundles.Add(new ScriptBundle("~/bundles/documents/common")
                .Include(string.Format(distFolder, "polyfills*"))
                .Include(string.Format(distFolder, "vendor*")));               

            //Get documents folder
            var folder = HttpContext.Current.Server.MapPath("~/Content/Documents");

            //Get file Names
            var fileNames = Directory
                .EnumerateFiles(folder)
                .Select(x => Path.GetFileNameWithoutExtension(x));

            //Iterate through files and register bundles
            foreach (var fileName in fileNames)
            {
                var bundleName = string.Format("~/bundles/documents/{0}", fileName);
                var jsPath = string.Format(distFolder, fileName + "*");

                bundles.Add(new Bundle(bundleName).Include(jsPath));
            }
        }
    }
}
