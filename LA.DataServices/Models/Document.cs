using System.Collections.Generic;

namespace LA.DataServices.Models
{
    public class Document
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public string FileName { get; set; }

        public string UrlKey { get; set; }

        public virtual List<DocumentComponent> DocumentComponents { get; set; }

        public virtual Category Category { get; set; }
    }
}
