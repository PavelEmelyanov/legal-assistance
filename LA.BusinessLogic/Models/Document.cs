using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Models
{
    public class Document
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public string FileName { get; set; }

        public string UrlKey { get; set; }

        public List<DocumentComponent> DocumentComponents { get; set; }

        public Category Category { get; set; }
    }
}
