using LA.DataServices.Interfaces;
using LA.DataServices.Models;
using System.Collections.Generic;

namespace LA.DataServices.Services
{
    public class CategoryService : ICategoryService
    {
        public List<Category> GetAll()
        {
            return Categories;
        }

        private List<Category> Categories = new List<Category>
        {
            new Category
            {
                ID = 1,
                Name = "Товары"
            },
            new Category
            {
                ID = 2,
                Name = "Услуги"
            },
            new Category
            {
                ID = 3,
                Name = "ЖКХ"
            }
        };
    }
}
