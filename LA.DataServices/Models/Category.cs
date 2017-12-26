using System.Collections.Generic;

namespace LA.DataServices.Models
{
    public class Category
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public virtual List<Document> Documents { get; set; }
    }
}
