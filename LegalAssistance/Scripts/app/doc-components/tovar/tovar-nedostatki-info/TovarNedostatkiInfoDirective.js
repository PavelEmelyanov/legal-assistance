(function () {
    'use strict';

    TovarNedostatkiInfo.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovarNedostatkiInfo', TovarNedostatkiInfo);

    function TovarNedostatkiInfo(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/tovar-nedostatki-info/TovarNedostatkiInfo.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.orgInfo = {
                        isSelected: false
                    };

                    $scope.components = {                        
                        nedostatkiSumma: {
                            componentType: componentTypes.rub,
                            componentInFileKey: 'tovar-nedostatki-summa'
                        },
                        nedostatkiOpisanie: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'tovar-nedostatki-opisanie'
                        },                    
                        nedostatkiFirma: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'tovar-nedostatki-firma',
                            getValue: function () {
                                if ($scope.orgInfo.isSelected) {
                                    var template = "ИНН: {0},{1} {2}, Адрес: {3}";
                                    var ogrn = $scope.orgInfo.ogrn
                                        ? " ОГРН: {0},".format($scope.orgInfo.ogrn)
                                        : "";

                                    return template.format(
                                        $scope.orgInfo.inn,
                                        ogrn,
                                        $scope.orgInfo.nazvaniaOrganizaciya,
                                        $scope.orgInfo.addressOrganizaciya);
                                }
                                else {
                                    return null;
                                }
                            }
                        },
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }                
                
                init();
            }
        };
    };
})()