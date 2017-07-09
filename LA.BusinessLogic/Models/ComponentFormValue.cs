using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Models
{
    public class ComponentFormValue
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public bool RemoveLineIfResultIsEmpty { get; set; }
    }
}
