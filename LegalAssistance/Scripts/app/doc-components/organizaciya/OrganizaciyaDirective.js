(function () {
    'use strict';

    Organizaciya.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laOrganizaciya', Organizaciya);

    function Organizaciya(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/organizaciya/Organizaciya.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        komu: {
                            componentType: componentTypes.radioGroup,
                            componentInFileKey: 'komu',
                            options: [
                                {
                                    key: 'Продавец',
                                    value: 'Продавец',
                                    hint: 'Тот, кто продаёт товар и выдаёт чек - магазин или конкретный предприниматель.'
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
                            componentInFileKey: "ogrn"
                        },
                        nazvaniaOrganizaciya: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'nazvania-organizaciya',
                        },
                        addressOrganizaciya: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'address-organizaciya',
                        },
                    };

                    $scope.components.komu.value = $scope.components.komu.options[0].value;

                    $scope.relatedData = {
                        innTooltip: 'В случае продавца, ИНН и другую информацию можно найти на чеке. В случае изготовителя - на упаковке товара.',
                    }

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };    
})()