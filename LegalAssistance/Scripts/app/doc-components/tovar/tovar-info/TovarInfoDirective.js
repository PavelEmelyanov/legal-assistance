(function () {
    'use strict';

    Tovar.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovarInfo', Tovar);

    function Tovar(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/tovar-info/TovarInfo.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.tovarOdnovremenno = {};

                    $scope.components = {                        
                        mestoPokupki: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'mesto-pokupki'
                        },
                        naimenovanieTovara: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'naimenovanie-tovara'
                        },                      
                        imeetsyaLiDokument: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "imeetsya-li-dokument"
                        },
                        sutPretenzii: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'sut-pretenzii'
                        },
                        proverkaKachestva: {
                            componentType: componentTypes.checkboxWithInput,
                            componentInFileKey: "proverka-kachestva-info",
                            isSelected: false
                        },
                        tovarNeOdnovremenno: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "tovar-ne-odnovremenno",
                            getValue: function () {
                                return $scope.tovarOdnovremenno.isSelected
                                    ? null
                                    : "true";
                            }
                        }
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }                
                
                init();
            }
        };
    };
})()