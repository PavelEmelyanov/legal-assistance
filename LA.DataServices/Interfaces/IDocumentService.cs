using LA.DataServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.DataServices.Interfaces
{
    public interface IDocumentService
    {
        Document GetByUrlKey(string urlKey);

        List<Document> GetForMenu();
    }
}
