using LA.BusinessLogic.Models;

namespace LA.BusinessLogic.Interfaces
{
    public interface IDocxService
    {
        byte[] GetDocument(DocumentFormValue doc, string path);
    }
}
