using LA.Common.Enums;
using System.Collections.Generic;

namespace LA.BusinessLogic.Models
{
    internal class ExpressionInfo
    {
        public string Expression { get; set; }

        public DocExpressionKey ExpressionKey { get; set; }   
        
        public List<string> Parameters { get; set; }     
    }
}
