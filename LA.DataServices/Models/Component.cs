using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.DataServices.Models
{
    public class Component
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public long ComponentType { get; set; }
        public long? ComponentInputID { get; set; }
        public long? ComponentCheckboxID { get; set; }
        public long? ComponentRadioGroupID { get; set; }
        public long? ComponentDateID { get; set; }
        public long? ComponentCheckboxWithInputID { get; set; }

        public ComponentRadioGroup ComponentRadioGroup { get; set; }
        public ComponentInput ComponentInput { get; set; }
        public ComponentCheckbox ComponentCheckbox { get; set; }  
        public ComponentDate ComponentDate { get; set; }
        public ComponentCheckboxWithInput ComponentCheckboxWithInput { get; set; }

        public List<DocumentComponent> DocumentComponents { get; set; }
    }
}
