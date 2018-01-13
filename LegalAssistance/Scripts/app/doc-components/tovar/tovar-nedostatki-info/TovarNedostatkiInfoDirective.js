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
                            componentType: componentTypes.checkboxWithInput,
                            componentInFileKey: 'tovar-nedostatki-firma',
                            isSelected: false
                        },
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }                
                
                init();
            }
        };
    };
})()