using System.Collections.Generic;

namespace LA.BusinessLogic.Models
{
    public class DocumentMenuItem
    {        
        public string Category { get; set; }
        
        public List<Document> Documents { get; set; }        
    }
}
