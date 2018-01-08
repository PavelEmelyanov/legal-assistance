(function () {
    'use strict';

    PoluchitDengi.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laPoluchitDengi', PoluchitDengi);

    function PoluchitDengi(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/poluchit-dengi/PoluchitDengi.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.optionFlag = null;
                    $scope.cardNumber = null;
                    
                    $scope.components = {
                        sposobPolucheniyaDeneg: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "sposob-polucheniya-deneg",
                            getValue: function () {
                                if ($scope.optionFlag) {
                                    return 'путём перечисления на карту {0}'.format($scope.cardNumber);
                                } else {
                                    return 'наличными'
                                }
                            }
                        },
                    }

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()