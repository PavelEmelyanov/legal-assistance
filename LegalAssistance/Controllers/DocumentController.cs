using LA.BusinessLogic.Interfaces;
using LA.BusinessLogic.Services;
using System.Web.Mvc;

namespace LegalAssistance.Controllers
{
    public class DocumentController : Controller
    {
        private IDocumentService _documentService;
        
        public DocumentController()
        {
            _documentService = new DocumentService();
        }

        [Route("documents")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("documents/{urlKey}")]
        public ActionResult FillForm(string urlKey)
        {
            var document = _documentService.GetByUrlKey(urlKey);
            return View(document);
        }

        [Route("test")]
        public ActionResult Test()
        {
            var document = _documentService.GetByUrlKey("zamena-tovara-nenadlezhashego-kachestva");
            return View(document);
        }

        [ChildActionOnly]
        public ActionResult DocumentTree()
        {
            var docs = _documentService.GetForMenu();
            return PartialView("DocumentTree", docs);
        }
    }
}