using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Models
{
    public class DocumentFormValue
    {
        public long ID { get; set; }
        
        public string FileName { get; set; }

        public List<ComponentFormValue> Components { get; set; }
    }
}
