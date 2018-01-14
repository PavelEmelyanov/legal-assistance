(function () {
    'use strict';

    TovarUmenshenieCeni.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovarUmenshenieCeni', TovarUmenshenieCeni);

    function TovarUmenshenieCeni(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/tovar-umenshenie-ceni/TovarUmenshenieCeni.html',
            scope: true,
            link: function ($scope, element, attrs) {
                var init = function () {
                    $scope.components = {
                        novayaCenaTovara: {
                            componentType: componentTypes.rub,
                            componentInFileKey: 'novaya-cena-tovara',
                        },
                        raznicaCenaTovara: {
                            componentType: componentTypes.rub,                            
                            componentInFileKey: "raznica-cena-tovara"
                        }                       
                    };
                                        
                    componentsToDtoService.registerComponents($scope.components);
                }
                
                $scope.onPriceChange = function () {
                    if ($scope.components.novayaCenaTovara.value > 0) {
                        $scope.components.raznicaCenaTovara.value = $scope.cenaTovara - $scope.components.novayaCenaTovara.value;
                    }
                }

                $scope.$watch(function () {
                    return componentsToDtoService.getCenaTovara();
                }, function (newValue) {
                    $scope.cenaTovara = newValue;
                });
                
                init();
            }
        };
    };
})()