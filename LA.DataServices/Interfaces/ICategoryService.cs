using LA.DataServices.Models;
using System.Collections.Generic;

namespace LA.DataServices.Interfaces
{
    public interface ICategoryService
    {
        List<Category> GetAll();
    }
}
