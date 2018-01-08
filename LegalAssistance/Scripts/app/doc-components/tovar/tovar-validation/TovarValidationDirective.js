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
            },
            link: function ($scope, element, attrs) {
                var init = function () {
                    $scope.techSlozhniyTovar = {
                        flag: false,
                        sluchay: 0
                    };

                    $scope.sroki = {
                        showAlert: false
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
                    var dataPokupki = $scope.components.dataPokupki.value;
                    var docDate = $scope.components.docDate.value;

                    if (dataPokupki && docDate) {
                        var period = angular.utils.getDatePeriod(dataPokupki, docDate);
                        $scope.techSlozhniyTovar.pyatnadcatDney = period.days > 15;
                    }
                }

                init();
            }
        };
    };
})()