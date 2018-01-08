using System.Collections.Generic;

namespace LA.BusinessLogic.Models
{
    public class Document
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public string FileName { get; set; }

        public string UrlKey { get; set; }

        public int SortOrder { get; set; }

        public List<DocumentComponent> DocumentComponents { get; set; }

        public Category Category { get; set; }
    }
}
