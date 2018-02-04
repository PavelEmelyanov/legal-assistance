(function () {
    'use strict';

    DocCommon.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laDocCommon', DocCommon);

    function DocCommon(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/doc-common/DocCommon.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        nameZayavitel: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'name-zayavitel'
                        },
                        addressZayavitel: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'address-zayavitel'
                        },
                        pol: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "pol"
                        },
                        phoneZayavitel: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'phone-zayavitel'
                        }
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()