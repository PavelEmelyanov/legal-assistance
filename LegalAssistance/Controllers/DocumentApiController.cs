using LA.BusinessLogic.Interfaces;
using LA.BusinessLogic.Models;
using LegalAssistance.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace LegalAssistance.Controllers
{
    public class DocumentApiController : ApiController
    {
        private readonly IDocxService _docxService;

        public DocumentApiController()
        {
            _docxService = new LA.BusinessLogic.Services.DocxService();
        }

        [HttpPost]
        [Route("api/document/generate")]
        public HttpResponseMessage GenerateDocument([FromBody]DocumentFormValue doc)
        {
            var path = GetFilePath(doc.FileName);

            var docBuffer = _docxService.GetDocument(doc, path);

            var result = GetWordDocResponse(docBuffer);
            return result;
        }

        private string GetFilePath(string fileName)
        {
            var root = HttpContext.Current.Server.MapPath("~/Content/Documents");
            var path = Directory.GetFiles(root, $"{fileName}.*").FirstOrDefault();

            return path;
        }

        private HttpResponseMessage GetWordDocResponse(byte[] docxBuffer)
        {
            var result = Request.CreateResponse(HttpStatusCode.Created);
            result.Content = new ByteArrayContent(docxBuffer);
            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment") { FileName = "file1.docx" };

            return result;
        }
    }
}
