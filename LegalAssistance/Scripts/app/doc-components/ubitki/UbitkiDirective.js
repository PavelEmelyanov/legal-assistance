(function () {
    'use strict';

    Ubitki.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laUbitki', Ubitki);

    function Ubitki(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/ubitki/Ubitki.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        vozmeshenieUbitkovProsba: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'vozmeshenie-ubitkov-prosba',
                            removeLineIfResultIsEmpty: true,
                            getValue: function () {
                                if ($scope.flag) {
                                    return $scope.prosba + '.';
                                } else {
                                    return null;
                                }
                            }
                        },
                        vozmeshenieUbitkovSumma: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'vozmeshenie-ubitkov-summa',
                            removeLineIfResultIsEmpty: true,
                            getValue: function() {
                                if ($scope.flag) {
                                    return Utils.toRub($scope.summa);
                                } else {
                                    return null;
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