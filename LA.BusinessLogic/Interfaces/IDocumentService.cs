using LA.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Interfaces
{
    public interface IDocumentService
    {
        Document GetByUrlKey(string urlKey);
        List<DocumentMenuItem> GetForMenu();
    }
}
