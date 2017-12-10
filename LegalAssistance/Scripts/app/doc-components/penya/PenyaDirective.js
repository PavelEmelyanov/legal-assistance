(function () {
    'use strict';

    Penya.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laPenya', Penya);

    function Penya(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/penya/Penya.html',
            scope: {
                cenaTovara: '='
            },
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
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
                        obrashenieRaneeUstanovleno: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "obrashenie-ranee-ustanovleno",
                            getValue: () => {
                                if ($scope.penyaModel.proverkaKachestva) {
                                    return "Была установлена необходимость проверки качества.";
                                }

                                if ($scope.penyaModel.otsutstvieTovaraNaZamenu) {
                                    return 'Было установлено отсутствие товара для замены.';
                                }

                                if ($scope.penyaModel.dostavkaSever) {
                                    return "Товар необходимо доставить в район Крайнего Севера и приравненную к нему местность";
                                }

                                return null;
                            }
                        },
                        obrashenieRaneeNeustoyka: {
                            componentType: componentTypes.custom,
                            removeLineIfResultIsEmpty: true,
                            componentInFileKey: "obrashenie-ranee-neustoyka",
                            getValue: () => {
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
                            getValue: () => {
                                return $scope.penyaModel.formula;
                            }
                        },
                        obrashenieRaneeAnalogichniyTovarDate: {
                            componentType: componentTypes.custom,
                            removeLineIfResultIsEmpty: true,
                            componentInFileKey: "obrashenie-ranee-analog-tovar-data",
                            getValue: () => {
                                if ($scope.penyaModel.zamenaAnalogichnogoTovaraFlag) {
                                    return angular.utils.toDate($scope.penyaModel.analogichniyTovarDate);
                                } else {
                                    return null;
                                }
                            }
                        },
                        obrashenieRaneeAnalogichniyTovarNeustoyka: {
                            componentType: componentTypes.custom,
                            removeLineIfResultIsEmpty: true,
                            componentInFileKey: "obrashenie-ranee-analog-tovar-neustoyka",
                            getValue: () => {
                                if ($scope.penyaModel.zamenaAnalogichnogoTovaraFlag) {
                                    return angular.utils.toRub($scope.penyaModel.analogichniyTovarNeustoyka);
                                } else {
                                    return null;
                                }
                            }
                        },
                        obrashenieRaneeAnalogichniyTovarNeustoykaFormula: {
                            componentType: componentTypes.custom,
                            componentInFileKey: 'obrashenie-ranee-analog-tovar-neustoyka-formula',
                            getValue: () => {
                                return $scope.penyaModel.analogichniyTovarFormula;
                            }
                        },
                        stat21: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "stat-21",
                            getValue: () => {
                                if ($scope.penyaModel.trebovatNeustoyku) {
                                    return "21,";
                                } else {
                                    return null;
                                }
                            }
                        },
                    };

                    $scope.penyaModel = {
                        flag: false,
                        zamenaAnalogichnogoTovaraFlag: false                      
                    };
                    
                    $scope.$watch('cenaTovara', function (value) {
                        $scope.calculateNeustoyka();
                        $scope.calculateNeustoykaAnalogichniyTovar();
                    });

                    componentsToDtoService.registerComponents($scope.components);
                }

                var reasons = [
                    'proverkaKachestva',
                    'otsutstvieTovaraNaZamenu',
                    'dostavkaSever',
                    'drugayPrichina'
                ];

                $scope.onReasonChange = function (selectedKey) {                   
                    angular.forEach(reasons, function (key) {
                        if (key != selectedKey) {
                            $scope.penyaModel[key] = false;
                        }
                    });

                    $scope.calculateNeustoyka();
                }

                $scope.isReasonSelected = function () {
                    return reasons.reduce(function (sum, key) {
                        return sum || $scope.penyaModel[key];
                    }, false);
                }

                //Подсчитать пеню, если обращение было ранее
                $scope.calculateNeustoyka = function () {   
                    if (!$scope.penyaModel.flag        
                        || !angular.utils.isNotNullOrEmpty($scope.penyaModel.date)
                        || $scope.penyaModel.dostavkaSever
                        || !($scope.cenaTovara > 0)) {

                        $scope.penyaModel.trebovatNeustoyku = false;
                        $scope.penyaModel.neustoyka = null;
                        $scope.penyaModel.formula = null;
                    } else {
                        var period = angular.utils.getDatePeriod($scope.penyaModel.date, new Date());
                        var delta = 7;

                        if ($scope.penyaModel.proverkaKachestva) {
                            delta = 14;
                        }

                        if ($scope.penyaModel.otsutstvieTovaraNaZamenu) {
                            delta = 30;
                        }

                        var neustoyka = Math.round((period.days - delta) * 0.01 * $scope.cenaTovara);

                        if (neustoyka > 0) {
                            $scope.penyaModel.trebovatNeustoyku = true;
                            $scope.penyaModel.neustoyka = neustoyka;
                            $scope.penyaModel.formula = '({0} - {1} - {2} дней) * 1% * {3}'
                                    .format(angular.utils.toDate(new Date()), angular.utils.toDate($scope.penyaModel.date), delta, $scope.cenaTovara);                                                  
                        }
                        else {
                            $scope.penyaModel.trebovatNeustoyku = false;
                            $scope.penyaModel.neustoyka = null;
                            $scope.penyaModel.formula = null;
                        }
                    }
                }

                //Подсчитать пеню, если было требование на предоставление аналогичного товара                
                $scope.calculateNeustoykaAnalogichniyTovar = function() {     
                    if (!$scope.penyaModel.zamenaAnalogichnogoTovaraFlag
                        || !angular.utils.isNotNullOrEmpty($scope.penyaModel.analogichniyTovarDate)
                        || !($scope.cenaTovara > 0)) {
              
                        $scope.penyaModel.analogichniyTovarFormula = null;
                        $scope.penyaModel.analogichniyTovarNeustoyka = null;
                        $scope.penyaModel.analogichniyTovarTrebovatNeustoyku = null;         
                    } else {
                        var period = angular.utils.getDatePeriod($scope.penyaModel.analogichniyTovarDate, new Date());
                        var delta = 3;

                        var neustoyka = Math.round((period.days - delta) * 0.01 * $scope.cenaTovara);

                        if (neustoyka > 0) {
                            $scope.penyaModel.analogichniyTovarFormula = '({0} - {1} - {2} дней) * 1% * {3}'
                                    .format(angular.utils.toDate(new Date()), angular.utils.toDate($scope.penyaModel.analogichniyTovarDate), delta, $scope.cenaTovara);
                            $scope.penyaModel.analogichniyTovarNeustoyka = neustoyka;
                            $scope.penyaModel.analogichniyTovarTrebovatNeustoyku = true;
                        }
                        else {
                            $scope.penyaModel.analogichniyTovarFormula = null;
                            $scope.penyaModel.analogichniyTovarNeustoyka = null;
                            $scope.penyaModel.analogichniyTovarTrebovatNeustoyku = false;
                        }
                    }
                }

                init();
            }
        };
    };
})()