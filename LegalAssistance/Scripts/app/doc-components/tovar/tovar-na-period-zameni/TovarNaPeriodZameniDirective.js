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
                        hint7dney: 'Если некачественный товар, который вы хотите менять будут менять дольше 7 дней- вы можете на это время попросить аналогичный товар во временное пользование. Когда продавец найдёт товар, который вы попросили в качестве замены некачественного товара, Вам необходимо будет вернуть продавцу аналогичный товар, который вы брали на время и забрать товар, который вы просили изначально',
                        svoistvaTooltip: 'Потребительские свойства - проявляющиеся при использовании товара потребителем, свойства, в процессе удовлетворения потребностей. Это совокупность технических, экономических и эстетических качеств товара, обеспечивающих покупателю наибольшее удовлетворение его потребностей за оптимальную цену'
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }

                init();
            }
        };
    };
})()