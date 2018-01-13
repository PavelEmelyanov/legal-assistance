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
                            componentType: componentTypes.checkboxWithInput,
                            componentInFileKey: "obmen-tovara-model",
                            isSelected: false
                        },
                    }

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()