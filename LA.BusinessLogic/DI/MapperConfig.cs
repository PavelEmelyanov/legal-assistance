using AutoMapper;
using LA.BusinessLogic.Models;

namespace LA.BusinessLogic.DI
{
    public class MapperConfig
    {
        public static void Configure()
        {
            Mapper.CreateMap<DataServices.Models.Document, Document>();
            Mapper.CreateMap<DataServices.Models.Component, Component>();
            Mapper.CreateMap<DataServices.Models.DocumentComponent, DocumentComponent>();
            Mapper.CreateMap<DataServices.Models.ComponentCheckbox, ComponentCheckbox>();
            Mapper.CreateMap<DataServices.Models.ComponentCheckboxWithInput, ComponentCheckboxWithInput>();
            Mapper.CreateMap<DataServices.Models.ComponentDate, ComponentDate>();
            Mapper.CreateMap<DataServices.Models.ComponentInput, ComponentInput>();
            Mapper.CreateMap<DataServices.Models.ComponentRadioGroup, ComponentRadioGroup>();
            Mapper.CreateMap<DataServices.Models.Category, Category>();
        }
    }
}
