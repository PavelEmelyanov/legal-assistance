using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Xceed.Words.NET;

namespace LA.BusinessLogic.Services
{
    internal static class DocxExtension
    {
        internal static byte[] SaveToByteArray(this DocX document)
        {
            // Save changes made to this document    
            using (MemoryStream ms = new MemoryStream())
            {
                document.SaveAs(ms);
                ms.Seek(0, SeekOrigin.Begin);

                ms.Position = 0;
                byte[] docxBuffer = new byte[ms.Length];
                ms.Read(docxBuffer, 0, (int)ms.Length);

                return docxBuffer;
            }
        }                

        internal static void ReplaceParameter(this DocX document, string parameter, string value)
        {
            var key = WrapInParameter(parameter);
            document.ReplaceText(key, value ?? string.Empty, false, RegexOptions.IgnoreCase);
        }

        internal static void ReplaceExpression(this DocX document, string expression, string value)
        {
            var key = WrapInExpression(expression);
            document.ReplaceText(key, value ?? string.Empty, false, RegexOptions.IgnoreCase);
        }

        internal static void RemoveFirstParagraphByExpression(this DocX document, string expression)
        {
            var key = WrapInExpression(expression);
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

        private static string WrapInExpression(string value)
        {
            var sb = new System.Text.StringBuilder();
            sb.Append("{{");
            sb.Append(value);
            sb.Append("}}");
            var result = sb.ToString();
            return result;
        }

        private static string WrapInParameter(string value)
        {
            return $"[[{value}]]";
        }
    }
}
