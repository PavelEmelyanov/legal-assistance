﻿(function () {
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
                            componentInFileKey: "pol"
                        }                        
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()