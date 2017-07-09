using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.DataServices.Models
{
    public class DocumentComponent
    {
        public long ID { get; set; }
        public long DocumentID { get; set; }
        public long ComponentID { get; set; }
        public string ComponentInDocumentKey { get; set; }
        public string ResultTextTemplate { get; set; }
        public bool RemoveLineIfResultIsEmpty { get; set; }
        public Document Document { get; set; }
        public Component Component { get; set; }
    }
}
