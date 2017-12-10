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
                    $scope.ubitkiModel = {
                        flag: false,
                    };

                    $scope.components = {
                        vozmeshenieUbitkovProsba: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'vozmeshenie-ubitkov-prosba',
                            removeLineIfResultIsEmpty: true,
                            getValue: function () {
                                if ($scope.ubitkiModel.flag) {
                                    return $scope.ubitkiModel.prosba + '.';
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
                                if ($scope.ubitkiModel.flag) {
                                    return angular.utils.toRub($scope.ubitkiModel.summa);
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