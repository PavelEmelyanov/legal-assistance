using LA.DataServices.Interfaces;
using LA.DataServices.Models;
using System.Collections.Generic;
using System.Linq;

namespace LA.DataServices.Services
{
    public class DocumentService : IDocumentService
    {
        public Document GetByUrlKey(string urlKey)
        {
            return Documents.FirstOrDefault(x => x.UrlKey == urlKey);
        }

        public List<Document> GetForMenu()
        {
            return Documents;
        }

        private List<Document> Documents = new List<Document>
        {
            new Document
            {
                ID = 1,
                Name = "Замена Товара Ненадлежащего Качества",
                FileName = "zamena-tovara-nenadlezhashego-kachestva",
                UrlKey = "zamena-tovara-nenadlezhashego-kachestva",
                CategoryID = 1,
                SortOrder = 2
            },
            new Document
            {
                ID = 2,
                Name = "Возврат Товара Ненадлежащего Качества",
                FileName = "vozvrat-tovara-deneg",
                UrlKey = "vozvrat-tovara-nenadlezhashego-kachestva",
                CategoryID = 1,
                SortOrder = 1
            },
            new Document
            {
                ID = 3,
                Name = "Возмещение расходов на устранение недостатков товара",
                FileName = "vozmeshenie-rashodov-na-ustranenie-nedostatkov-tovara",
                UrlKey = "vozmeshenie-rashodov-na-ustranenie-nedostatkov-tovara",
                CategoryID = 1,
                SortOrder = 3
            },
            new Document
            {
                ID = 4,
                Name = "Соразмерное уменьшение покупной цены товара",
                FileName = "sorazmernoe-umenshenie-pokupnoy-ceni-tovara",
                UrlKey = "sorazmernoe-umenshenie-pokupnoy-ceni-tovara",
                CategoryID = 1,
                SortOrder = 4
            }
        };
    }
}
