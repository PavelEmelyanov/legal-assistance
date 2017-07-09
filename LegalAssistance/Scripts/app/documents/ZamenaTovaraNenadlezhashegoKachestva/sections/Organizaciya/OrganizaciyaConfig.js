(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('OrganizaciyaConfig', OrganizaciyaConfig);

    OrganizaciyaConfig.$inject =
        ['ComponentTypes'];

    function OrganizaciyaConfig(componentTypes) {

        //File name is key
        var components = {
            komu: {
                componentType: componentTypes.radioGroup,
                componentInFileKey: 'komu',
                options: [
                    {
                        key: 'Продавец',
                        value: 'Продавец',
                        hint: 'Тот, кто продаёт товар и выдаёт чек - магазин.'                        
                    },
                    {
                        key: 'Изготовитель',
                        value: 'Изготовитель',
                        hint: 'Тот, кто производит товар, например фабрика. В случае если невозможо обратится к продавцу (магазин закрылся, нету чека, не помните где купили), можно обратится к изготовителю.'
                    },
                    //{
                    //    key: 'Уполномоченный индивидуальный предприниматель',
                    //    value: 'Уполномоченный индивидуальный предприниматель'
                    //},
                    //{
                    //    key: 'Импортёр',
                    //    value: 'Импортёр'
                    //},
                    //{
                    //    key: 'Уполномоченная организация',
                    //    value: 'Уполномоченная организация'
                    //},
                ]
            },
            inn: {
                componentType: componentTypes.input,
                componentInFileKey: 'inn',
            },
            ogrn: {
                componentType: componentTypes.input,
                componentInFileKey: "ogrn",
                resultTextTemplate: "ОГРН: {0},",
                removeLineIfResultIsEmpty: true,
            },
            nazvaniaOrganizaciya: {
                componentType: componentTypes.input,
                componentInFileKey: 'nazvania-organizaciya',
            },
            addressOrganizaciya: {
                componentType: componentTypes.input,
                componentInFileKey: 'address-organizaciya',
            },            
        }

        return {
            get: function () {
                return components;
            }
        };
    }
})();