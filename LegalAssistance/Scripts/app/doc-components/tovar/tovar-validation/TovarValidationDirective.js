(function () {
    'use strict';

    ZamenaTovaraValidation.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovarValidation', ZamenaTovaraValidation);

    function ZamenaTovaraValidation(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/tovar-validation/TovarValidation.html',
            scope: {
                getActionText: '&',
                mode: '@'
            },
            link: function ($scope, element, attrs) {
                var init = function () {
                    $scope.modes = {
                        simple: 'simple',
                        complex: 'complex'
                    }

                    $scope.techSlozhniyTovar = {
                        flag: false,
                        sluchay: 0,
                        blockDisabled: false
                    };
                                        
                    $scope.actionText = $scope.getActionText();

                    $scope.components = {
                        dataPokupki: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'data-pokupki'
                        },
                        docDate: {
                            componentType: componentTypes.input,
                            componentInFileKey: "doc-date"
                        }
                    }
                    
                    componentsToDtoService.registerComponents($scope.components);
                }

                $scope.checkPyatnadcatDney = function () {
                    if ($scope.mode == $scope.modes.complex) {
                        var dataPokupki = $scope.components.dataPokupki.value;
                        var docDate = $scope.components.docDate.value;

                        if (dataPokupki && docDate) {
                            var period = angular.utils.getDatePeriod(dataPokupki, docDate);
                            $scope.techSlozhniyTovar.pyatnadcatDney = period.days > 15;
                        }
                    }                    
                }

                $scope.techTovarBlockVisible = function () {
                    return $scope.techSlozhniyTovar.pyatnadcatDney
                        || $scope.mode == $scope.modes.simple
                }

                $scope.techTovarReasonBlockVisible = function () {
                    return $scope.techSlozhniyTovar.flag
                        && $scope.mode == $scope.modes.complex;
                }

                $scope.techTovarBlockDisabled = function () {
                    $scope.techSlozhniyTovar.blockDisabled = $scope.techSlozhniyTovar.flag
                        && $scope.mode == $scope.modes.simple;

                    return $scope.techSlozhniyTovar.blockDisabled;
                }

                init();
            }
        };
    };
})()