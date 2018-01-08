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
        private DataServices.Interfaces.ICategoryService _categoryService;

        public DocumentService()
        {
            _documentService = new DataServices.Services.DocumentService();
            _categoryService = new DataServices.Services.CategoryService();
        }

        public Document GetByUrlKey(string urlKey)
        {
            var result = _documentService.GetByUrlKey(urlKey);
            return MappingHelper.Map<DataServices.Models.Document, Document>(result);
        }
        
        public List<DocumentMenuItem> GetForMenu()
        {
            var documents = _documentService.GetForMenu();
            var categories = _categoryService.GetAll();

            var result = categories.Select(x => new DocumentMenuItem
            {
                Category = x.Name,
                Documents = documents
                    .Where(y => y.CategoryID == x.ID)
                    .OrderBy(y => y.SortOrder)
                    .Select(y => MappingHelper.Map<DataServices.Models.Document, Document>(y))
                    .ToList()
            }).ToList();

            return result;
        }
    }
}
