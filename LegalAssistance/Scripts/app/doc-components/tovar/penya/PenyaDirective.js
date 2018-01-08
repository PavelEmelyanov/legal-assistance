(function () {
    'use strict';

    Penya.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laPenya', Penya);

    function Penya(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/penya/Penya.html',
            scope: {
                docDate: '='
            },
            link: function ($scope, element, attrs) {
                var init = function () {
                    $scope.components = {
                        cenaTovara: {
                            componentType: componentTypes.rub,
                            componentInFileKey: 'cena-tovara',
                        },
                        obrashenieRaneeDate: {
                            componentType: componentTypes.custom,
                            removeLineIfResultIsEmpty: true,
                            componentInFileKey: "obrashenie-ranee-data",
                            getValue: function() {
                                if ($scope.penyaModel.date) {
                                    return angular.utils.toDate($scope.penyaModel.date);
                                } else {
                                    return null;
                                }
                            }
                        },
                        obrashenieRaneeNeustoyka: {
                            componentType: componentTypes.custom,
                            removeLineIfResultIsEmpty: true,
                            componentInFileKey: "obrashenie-ranee-neustoyka",
                            getValue: function () {
                                if ($scope.penyaModel.flag) {
                                    return angular.utils.toRub($scope.penyaModel.neustoyka);
                                } else {
                                    return null;
                                }
                            }
                        },
                        obrashenieRaneeNeustoykaFormula: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'obrashenie-ranee-neustoyka-formula',
                            getValue: function () {
                                return $scope.penyaModel.formula;
                            }
                        },                        
                    };

                    $scope.penyaModel = {
                        flag: false,                   
                    };
                    
                    $scope.relatedData = {
                        obrashenieRaneeHint: 'Ваше обращение было письменным или имеются другие доказательства факта.'
                    }
                    
                    componentsToDtoService.registerComponents($scope.components);
                }
                
                $scope.onPriceChange = function () {
                    $scope.calculateNeustoyka();
                }

                //Подсчитать пеню, если обращение было ранее
                $scope.calculateNeustoyka = function () {
                    $scope.penyaModel.docDate = getDocDate();
                    $scope.cenaTovara = $scope.components.cenaTovara.value;

                    if (!$scope.penyaModel.flag
                        || !angular.utils.isNotNullOrEmpty($scope.penyaModel.date)                        
                        || !($scope.cenaTovara > 0)) {

                        $scope.penyaModel.trebovatNeustoyku = false;
                        $scope.penyaModel.neustoyka = null;
                        $scope.penyaModel.formula = null;
                    } else {
                        var period = angular.utils.getDatePeriod($scope.penyaModel.date, $scope.penyaModel.docDate);
                        var delta = 10;

                        var neustoyka = Math.round((period.days - delta) * 0.01 * $scope.cenaTovara);

                        if (neustoyka > 0) {
                            $scope.penyaModel.trebovatNeustoyku = true;
                            $scope.penyaModel.neustoyka = neustoyka;
                            $scope.penyaModel.formula = '({0} - {1} - {2} дней) * 1% * {3}'
                                    .format(angular.utils.toDate($scope.penyaModel.docDate), angular.utils.toDate($scope.penyaModel.date), delta, $scope.cenaTovara);
                        }
                        else {
                            $scope.penyaModel.trebovatNeustoyku = false;
                            $scope.penyaModel.neustoyka = null;
                            $scope.penyaModel.formula = null;
                        }
                    }
                }

                function getDocDate() {
                    var result = componentsToDtoService.getDocDate();

                    if (result) {
                        return result;
                    }
                    else {
                        throw new Error("Doc date is undefined");
                    }
                }

                init();
            }
        };
    };
})()