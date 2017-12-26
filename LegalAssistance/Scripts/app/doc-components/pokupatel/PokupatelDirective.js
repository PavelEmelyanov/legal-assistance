(function () {
    'use strict';

    Pokupatel.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laPokupatel', Pokupatel);

    function Pokupatel(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/pokupatel/Pokupatel.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        pokupatel: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'pokupatel'
                        },
                        addressPokupatel: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'address-pokupatel'
                        },
                        pol: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "pol",
                            yesText: 1,
                            noText: 0
                        }
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()