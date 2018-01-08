(function () {
    'use strict';

    ZamenaTovara.$inject = ['ComponentsToDtoService', 'ComponentTypes', '$rootScope'];

    angular.module('LASite.doc-components')
        .directive('laZamenaTovara', ZamenaTovara);

    function ZamenaTovara(componentsToDtoService, componentTypes, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/zamena-tovara/ZamenaTovara.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.drugoyTovarFlag = false;
                    
                    $scope.relatedData = {
                        drugoyTovarTooltip: 'У вас есть возможность заменить товар на любой другой, другого типа, с другими характеристиками и свойствами.',
                    }

                    $scope.components = {
                        obmenTovaraModel: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "obmen-tovara-model",
                            getValue: function () {
                                if ($scope.drugoyTovarFlag) {
                                    if (angular.utils.isNotNullOrEmpty($scope.drugoyArticul)) {
                                        return 'товар другой марки - {0}, артикул {1}'.format($scope.drugoyModel, $scope.drugoyArticul);
                                    } else {
                                        return 'товар другой марки - {0}'.format($scope.drugoyModel);
                                    }
                                } else {
                                    return 'такой же товар'
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