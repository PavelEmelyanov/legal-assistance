using LA.BusinessLogic.Interfaces;
using LA.BusinessLogic.Models;
using LA.Common.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Services
{
    public class DocumentService : IDocumentService
    {
        private DataServices.Interfaces.IDocumentService _documentService;

        public DocumentService()
        {
            _documentService = new DataServices.Services.DocumentService();
        }

        public Document GetByUrlKey(string urlKey)
        {
            var result = _documentService.GetByUrlKey(urlKey);
            return MappingHelper.Map<DataServices.Models.Document, Document>(result);
        }
        
        public List<Document> GetForMenu()
        {
            var result = _documentService.GetForMenu();
            return result.Select(x => MappingHelper.Map<DataServices.Models.Document, Document>(x)).ToList();
        }
    }
}
