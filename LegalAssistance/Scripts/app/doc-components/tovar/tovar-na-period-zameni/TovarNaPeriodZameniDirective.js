(function () {
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
                            removeLineIfResultIsEmpty: true,
                            getValue: function () {
                                if ($scope.tovarNaZamenuModel.mozhnoZamenitFlag) {
                                    return $scope.tovarNaZamenuModel.naimenovanie;
                                } else {
                                    return null;
                                }
                            }
                        },
                        analogichniyTovarArticul: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'analog-tovar-articul',
                            removeLineIfResultIsEmpty: true,
                            getValue: function () {
                                if ($scope.tovarNaZamenuModel.mozhnoZamenitFlag && $scope.tovarNaZamenuModel.articulFlag) {
                                    return ", Артикул {0}".format($scope.tovarNaZamenuModel.articul);                                    
                                } else {
                                    return null;
                                }
                            }
                        },
                    }

                    $scope.tovarNaZamenuModel = {
                        flag: false,
                        get mozhnoZamenitFlag() {
                            var flag = this.flag 
                              && this.zamenyamiyTovarFlag === false 
                              && this.obladaetSvoystvami === true;
    
                            return flag;
                        }
                    };

                    $scope.relatedData = {
                        alertNaZamenuTechSlozhniy: 'Вы не можете потребовать аналогичный товар на период замены, т.к. некачественный заменяемый товар включен в перечень товаров, не подлежащих замене.',
                        alertNaZamenuSvoistva: 'Вы не можете потребовать аналогичный товар на замену, который не обладает теми же свойствами, что и заменяемый.',
                        svoistvaTooltip: 'Потребительские свойства - проявляющиеся при использовании товара потребителем, свойства, в процессе удовлетворения потребностей. Это совокупность технических, экономических и эстетических качеств товара, обеспечивающих покупателю наибольшее удовлетворение его потребностей за оптимальную цену'
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()