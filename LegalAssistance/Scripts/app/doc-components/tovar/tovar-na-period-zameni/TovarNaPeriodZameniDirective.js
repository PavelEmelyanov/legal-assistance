﻿(function () {
    'use strict';

    TovarNaPeriodZameni.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovarNaPeriodZameni', TovarNaPeriodZameni);

    function TovarNaPeriodZameni(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/tovar-na-period-zameni/TovarNaPeriodZameni.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        analogichniyTovarNaimenovanie: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'analog-tovar-naimenovanie',
                            getValue: function () {
                                if ($scope.tovarNaZamenuModel.mozhnoZamenitFlag) {
                                    return $scope.tovarNaZamenuModel.naimenovanieTovara;
                                } else {
                                    return null;
                                }
                            }
                        }
                    }

                    $scope.tovarNaZamenuModel = {
                        flag: false,
                        get mozhnoZamenitFlag() {
                            var flag = this.flag
                              && this.bolee7dney === true
                              && this.zamenyamiyTovarFlag === false 
                              && this.obladaetSvoystvami === true;
    
                            return flag;
                        }
                    };

                    $scope.relatedData = {
                        alertNaZamenuTechSlozhniy: 'К сожалению, Вы не можете потребовать аналогичный товар на период замены, т.к. некачественный заменяемый товар включен в перечень товаров, не подлежащих замене.',
                        alertNaZamenuSvoistva: 'К сожалению, Вы не можете потребовать аналогичный товар на замену, который не обладает теми же свойствами, что и заменяемый.',
                        alertNaBolee7dney: 'К сожалению, Вы не можете потребовать аналогичный товар на период замены, т.к. время замены некачественного товара составит менее 7 дней.',
                        svoistvaTooltip: 'Потребительские свойства - проявляющиеся при использовании товара потребителем, свойства, в процессе удовлетворения потребностей. Это совокупность технических, экономических и эстетических качеств товара, обеспечивающих покупателю наибольшее удовлетворение его потребностей за оптимальную цену'
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()