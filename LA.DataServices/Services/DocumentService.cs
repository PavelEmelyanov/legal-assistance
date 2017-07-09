using LA.Common.Enums;
using LA.DataServices.Interfaces;
using LA.DataServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.DataServices.Services
{
    public class DocumentService : IDocumentService
    {
        public Document GetByUrlKey(string urlKey)
        {
            return Documents.FirstOrDefault(x => x.UrlKey == urlKey);
        }

        public List<Document> GetForMenu()
        {
            return Documents;
        }

        private List<Document> Documents = new List<Document>
        {
            new Document
            {
                ID = 1,
                Name = "Замена Товара Ненадлежащего Качества",
                FileName = "zamena-tovara-nenadlezhashego-kachestva",
                UrlKey = "zamena-tovara-nenadlezhashego-kachestva",
                Category = new Category { Name= "Товары" },
                DocumentComponents = new List<DocumentComponent>
                {
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "komu",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "К кому обращаемся?",
                            ComponentType = (long)ComponentType.RadioGroup,
                            ComponentRadioGroup = new ComponentRadioGroup
                            {
                                LabelText = "К кому обращаемся?",
                                RadioLabels = @"Продавец,Продавец;
                                    Изготовитель,Изготовитель;
                                    Уполномоченный индивидуальный предприниматель,Уполномоченный индивидуальный предприниматель;
                                    Импортёр,Импортёр;
                                    Уполномоченная организация,Уполномоченная организация"
                            }
                        },
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "inn",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "ИНН",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "ИНН",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "ogrn",
                        ResultTextTemplate = "ОГРН: {0},",
                        RemoveLineIfResultIsEmpty = true,
                        Component = new Component
                        {
                            Name = "ОГРН",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "ОГРН",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "nazvania-organizaciya",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Название/ФИО",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Название/ФИО, того к кому обращаемся",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "address-organizaciya",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Адрес к кому обращаемся",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Адрес к кому обращаемся",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "pokupatel",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Покупатель ФИО",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Покупатель ФИО",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "address-pokupatel",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Покупатель Адрес",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Покупатель Адрес",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "data-pokupki",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Дата совершения покупки",
                            ComponentType = (long)ComponentType.Date,
                            ComponentDate = new ComponentDate
                            {
                                LabelText = "Дата совершения покупки",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "mesto-pokupki",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Место совершения покупки",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Место совершения покупки",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "naimenovanie-tovara",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Наименование товара",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Наименование товара",
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "articul",
                        ResultTextTemplate = ", Артикул {0}",
                        Component = new Component
                        {
                            Name = "Артикул",
                            ComponentType = (long)ComponentType.CheckboxWithInput,
                            ComponentCheckboxWithInput = new ComponentCheckboxWithInput
                            {
                                LabelText = "Артикул",
                                NoText = string.Empty
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "cena-tovara",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Цена товара",
                            ComponentType = (long)ComponentType.Input,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Цена товара (руб)"
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "imeetsya-li-dokument",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Документ, подтверждающий факт покупки",
                            ComponentType = (long)ComponentType.Checkbox,
                            ComponentCheckbox = new ComponentCheckbox
                            {
                                LabelText = "Документ, подтверждающий факт покупки, имеется",
                                YesText = "Документ, подтверждающий факт покупки, имеется",
                                NoText = string.Empty
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "sut-pretenzii",
                        ResultTextTemplate = "{0}",
                        Component = new Component
                        {
                            Name = "Суть претензии по качеству",
                            ComponentType = (long)ComponentType.TextArea,
                            ComponentInput = new ComponentInput
                            {
                                LabelText = "Суть претензии по качеству"
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "garantiyniy-srok",
                        ResultTextTemplate = "На данный товар установлен гарантийный срок {0} месяцев.",
                        RemoveLineIfResultIsEmpty = true,
                        Component = new Component
                        {
                            Name = "Гарантийный срок",
                            ComponentType = (long)ComponentType.CheckboxWithInput,
                            ComponentCheckboxWithInput = new ComponentCheckboxWithInput
                            {
                                LabelText = "Гарантийный срок (месяцев)",
                                NoText = string.Empty
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "srok-godnosti",
                        ResultTextTemplate = "На данный товар установлен срок годности {0} месяцев.",
                        RemoveLineIfResultIsEmpty = true,
                        Component = new Component
                        {
                            Name = "Срок годности",
                            ComponentType = (long)ComponentType.CheckboxWithInput,
                            ComponentCheckboxWithInput = new ComponentCheckboxWithInput
                            {
                                LabelText = "Срок годности (месяцев)",                                
                                NoText = string.Empty
                            }
                        }
                    },
                    new DocumentComponent
                    {
                        ComponentInDocumentKey = "srok-sluzhbi",
                        ResultTextTemplate = "На данный товар установлен срок службы {0} месяцев.",
                        RemoveLineIfResultIsEmpty = true,
                        Component = new Component
                        {
                            Name = "Срок службы",
                            ComponentType = (long)ComponentType.CheckboxWithInput,
                            ComponentCheckboxWithInput = new ComponentCheckboxWithInput
                            {
                                LabelText = "Срок службы (месяцев)",                                
                                NoText = string.Empty
                            }
                        }
                    },                    
                }
            }
        };
    }
}
