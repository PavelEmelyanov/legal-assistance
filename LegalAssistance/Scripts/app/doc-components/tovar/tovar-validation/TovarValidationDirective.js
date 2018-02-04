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
                mode: '@',
                validPotreblyamii: '='
            },
            link: function ($scope, element, attrs) {
                var init = function () {
                    $scope.modes = {
                        simple: 'simple',
                        complex: 'complex'
                    }

                    $scope.nedostatokInfo = {
                        obichniiNedostatok: false,
                        sushestveniiNedostatokHint: 'Неустранимый недостаток или недостаток, который не может быть устранен без несоразмерных расходов или затрат времени, или выявляется неоднократно, или проявляется вновь после его устранения, или другие подобные недостатки.',
                        obichniiNedostatokHint: 'Несоответствие товара (работы, услуги) или обязательным требованиям, предусмотренным законом либо в установленном им порядке, или условиям договора (при их отсутствии или неполноте условий обычно предъявляемым требованиям), или целям, для которых товар (работа, услуга) такого рода обычно используется, или целям, о которых продавец (исполнитель) был поставлен в известность потребителем при заключении договора, или образцу и (или) описанию при продаже товара по образцу и (или) по описанию.'
                    }

                    $scope.tovarType = {
                        potreblyamiiTovar: false,
                        potreblyamiiTovarHint: 'Продукты питания, косметика. Товары, которые уничтожаются в процессе потребления.',
                        nepotreblyamiiTovarHint: 'Телевизор, автомобиль. Товары, которые постепенно изнашиваются в процессе потребления, но не уничтожаются.'
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

                $scope.disableNedostatokTab = function () {
                    return $scope.tovarType.potreblyamiiTovar
                        && $scope.nedostatokInfo.obichniiNedostatok;
                }

                $scope.checkTovarType = function () {
                    var invalid = !$scope.validPotreblyamii
                        && $scope.tovarType.potreblyamiiTovar

                    return !invalid;
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
                    return !$scope.tovarType.potreblyamiiTovar
                        && ($scope.techSlozhniyTovar.pyatnadcatDney
                            || $scope.mode == $scope.modes.simple)

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