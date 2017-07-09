using LA.BusinessLogic.Models;
using LegalAssistance.Models;
using Novacode;
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
        [HttpPost]
        [Route("api/document/generate")]
        public HttpResponseMessage GenerateDocument([FromBody]DocumentFormValue doc)
        {
            var path = GetFilePath(doc.FileName);

            using (DocX document = DocX.Load(path))
            {
                UpdateDocument(document, doc);
                return SaveDocument(document);                
            }
        }

        private List<FormInfoViewModel> GetParameters(string path)
        {
            var result = new List<FormInfoViewModel>();

            using (DocX document = DocX.Load(path))
            {
                var text = document.Text;
                var matches = Regex.Matches(text, @"\[\[(.*?)\]\]");

                foreach (Match m in matches)
                {
                    result.Add(new FormInfoViewModel
                    {
                        Key = m.Groups[1].Value
                    });
                }

                return result;
            }
        }

        private string GetFilePath(string fileName)
        {
            var root = HttpContext.Current.Server.MapPath("~/Content/Documents");
            var path = Directory.GetFiles(root, $"{fileName}.*").FirstOrDefault();

            return path;
        }

        private void UpdateDocument(DocX document, DocumentFormValue doc)
        {   
            foreach (var p in doc.Components)
            {
                var key = string.Format("[[{0}]]", p.Key);

                if (string.IsNullOrEmpty(p.Value) && p.RemoveLineIfResultIsEmpty)
                {
                    var paragraph = document.Paragraphs.FirstOrDefault(x => x.Text.Contains(key));

                    if (paragraph != null)
                    {
                        var lines = paragraph.Text.Split('\n');

                        if (lines.Length <= 1)
                        {
                            paragraph.Remove(false);
                        }
                        else
                        {
                            paragraph.ReplaceText("\n" + key, string.Empty);
                            paragraph.ReplaceText(key + "\n", string.Empty);
                        }
                    }                                       
                }
                else
                {
                    document.ReplaceText(key, p.Value ?? string.Empty, false, RegexOptions.IgnoreCase);
                }                
            }
        }

        private HttpResponseMessage SaveDocument(DocX document)
        {
            // Save changes made to this document    
            using (MemoryStream ms = new MemoryStream())
            {
                document.SaveAs(ms);
                ms.Seek(0, SeekOrigin.Begin);

                ms.Position = 0;
                byte[] docxBuffer = new byte[ms.Length];
                ms.Read(docxBuffer, 0, (int)ms.Length);

                var result = Request.CreateResponse(HttpStatusCode.Created);
                result.Content = new ByteArrayContent(docxBuffer);
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment") { FileName = "file1.docx" };

                return result;
            }
        }
    }
}
