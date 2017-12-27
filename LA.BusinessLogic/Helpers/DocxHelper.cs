using System.IO;
using Xceed.Words.NET;

namespace LA.BusinessLogic.Services
{
    internal static class DocxHelper
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
    }
}
