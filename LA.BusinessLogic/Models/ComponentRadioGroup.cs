using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.BusinessLogic.Models
{
    public class ComponentRadioGroup
    {
        public long ID { get; set; }
        public string LabelText { get; set; }

        /// <summary>
        /// String in format {radio label to show user},{radio value for document};{radio label to show user},{radio value for document};
        /// </summary>
        public string RadioLabels { get; set; }
    }
}
