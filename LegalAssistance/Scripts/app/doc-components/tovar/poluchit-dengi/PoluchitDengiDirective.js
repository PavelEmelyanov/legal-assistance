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
                    $scope.components = {
                        creditCardNumber: {
                            componentType: componentTypes.checkboxWithInput,
                            componentInFileKey: "credit-card-number",
                            getValue: function () {
                                if ($scope.optionFlag) {
                                    return 'наличными'
                                } else {                                    
                                    return 'путём перечисления на карту {0}'.format($scope.cardNumber);
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