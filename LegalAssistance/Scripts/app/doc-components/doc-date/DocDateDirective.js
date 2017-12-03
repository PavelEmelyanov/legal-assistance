(function () {
    'use strict';

    DocDate.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laDocDate', DocDate);

    function DocDate(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/doc-date/DocDate.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        docDate: {
                            componentType: componentTypes.input,
                            componentInFileKey: "doc-date",
                            value: new Date()
                        }
                    }

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()