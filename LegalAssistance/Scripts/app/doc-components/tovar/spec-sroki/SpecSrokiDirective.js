(function () {
    'use strict';

    SpecSroki.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laSpecSroki', SpecSroki);

    function SpecSroki(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/spec-sroki/SpecSroki.html',
            scope: {
                getActionText: '&',
                dataPokupki: '=datePokupki',
                docDate: '='
            },
            link: function ($scope, element, attrs) {

                var srokCases = {};

                var init = function () {                   
                    $scope.specSrokiInfo = {
                        success: true,
                        nedostatkiFlag: false
                    };

                    $scope.actionText = $scope.getActionText();

                    $scope.components = {
                        specSroki: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "spec-sroki",
                            getValue: function () {
                                return $scope.specSrokiInfo.successMessage
                            }
                        },
                    }
                    
                    componentsToDtoService.registerComponents($scope.components);

                    initSrokCases();

                    $scope.$watch('[dataPokupki, docDate]', function (newValue) {
                        if (newValue[0] && newValue[1]) {
                            $scope.checkSroki();
                        }                        
                    })
                }                

                $scope.checkSroki = function () {
                    var dataPokupki = $scope.dataPokupki,
                        docDate = $scope.docDate,
                        garantSrok = +$scope.specSrokiInfo.garantSrok,
                        srokSluzhbi = +$scope.specSrokiInfo.srokSluzhbi;
                    
                    //Если установлены оба срока, 
                    //то выбираем максимальный
                    if (garantSrok && srokSluzhbi) {
                        if (garantSrok >= srokSluzhbi) {
                            srokSluzhbi = null;
                        }
                        else {
                            garantSrok = null;
                        }
                    }

                    if (garantSrok) {
                        //Если гарантиный срок установлен
                        //Проверить гарантиный срок
                        checkSrok(
                            dataPokupki,
                            docDate,
                            garantSrok,
                            srokCases.yesGarant,
                            srokCases.yesGarantWithFlag,
                            24,
                            'гарантийный срок {0} истёк'.format(angular.utils.toMonths(garantSrok)));
                    }
                    else if (srokSluzhbi) {
                        //Если срок службы установлен
                        //Проверить срок службы
                        checkSrok(
                            dataPokupki,
                            docDate,
                            srokSluzhbi,
                            srokCases.yesSluzhba,
                            srokCases.yesSluzhbaWithFlag,
                            120,
                            'срок службы {0} истёк'.format(angular.utils.toMonths(srokSluzhbi)));
                    }
                    else {
                        //Если не один из сроков не установен
                        checkDefaultSroki(dataPokupki, docDate);                        
                    }
                }

                function checkSrok(dataPokupki, docDate, srok, srokCase, srokCaseWithFlag, nedostatkiSrok, errorMesage) {
                    var lastDate = angular.copy(dataPokupki);

                    lastDate.addMonths(srok);

                    if (docDate < lastDate) {
                        setSuccessResult(srokCase, srok);
                        $scope.specSrokiInfo.showNedostatkiFlag = false;
                    }
                    else {
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(nedostatkiSrok)

                        if (docDate < lastDate) {
                            $scope.specSrokiInfo.showNedostatkiFlag = true;

                            if ($scope.specSrokiInfo.nedostatkiFlag) {
                                setSuccessResult(srokCaseWithFlag, srok);
                            }
                            else {
                                setErrorResult(errorMesage, true);
                            }
                        }
                        else {
                            $scope.specSrokiInfo.showNedostatkiFlag = false;
                            $scope.specSrokiInfo.nedostatkiFlag = false;
                            setErrorResult(errorMesage, false);
                        }
                    }
                }

                function checkDefaultSroki(dataPokupki, docDate) {
                    var lastDate = angular.copy(dataPokupki),
                        defaultGarantSrok = 24,
                        defaultSrokSluzhbi = 120;

                    var errorGarantMessage = 'установленный законом гарантийный срок 2 года истёк',
                        errorSluzhbiMessage = 'недостатки товара возникли уже после передачи товара покупателю';

                    //Проверяем дефолтный гарантийный срок 2 года
                    lastDate.addMonths(defaultGarantSrok);

                    if (docDate < lastDate) {
                        setSuccessResult(srokCases.defaultGarant);
                        $scope.specSrokiInfo.showNedostatkiFlag = false;
                    }
                    else {
                        //Проверяем срок 10 лет
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(defaultSrokSluzhbi);

                        if (docDate < lastDate) {
                            //Показываем флаг и проверям срок службы
                            $scope.specSrokiInfo.showNedostatkiFlag = true;

                            if ($scope.specSrokiInfo.nedostatkiFlag) {
                                //Недостатки появились до получения товара
                                setSuccessResult(srokCases.defaultSluzhbaWithFlag);
                            }
                            else {
                                //Истёк срок службы 10 лет
                                setErrorResult(errorSluzhbiMessage);
                            }                            
                        }
                        else {
                            $scope.specSrokiInfo.showNedostatkiFlag = false;
                            $scope.specSrokiInfo.nedostatkiFlag = false;
                            //Истёк гарантийный срок и недостатки возникли после
                            setErrorResult(errorGarantMessage);
                        }
                    }
                }

                function setSuccessResult(srokCase, srok) {
                    $scope.specSrokiInfo.success = true;
                    $scope.specSrokiInfo.successMessage = srok 
                        ? srokCase.format(angular.utils.toMonths(srok))
                        : srokCase;

                    console.log($scope.specSrokiInfo.successMessage);
                }

                function setErrorResult(message, flag) {
                    $scope.specSrokiInfo.success = false;

                    var errorMessage = 'К сожалению Вы не можете {0}, т.к. {1}'
                        .format($scope.actionText, message);

                    if (flag) {
                        errorMessage += ' и недостатки товара возникли уже после передачи товара покупателю.';
                    }
                    else {
                        errorMessage += '.';
                    }

                    $scope.specSrokiInfo.errorMessage = errorMessage;
                }

                function initSrokCases() {
                    var yesMessage = 'На данный товар установлен {0}.';
                    var defaultMessage = 'На данный товар не установлен {0}.'
                    var flagMessage = ' Однако недостатки товара возникли по причинам, возникшим до передачи товара покупателю и в соответствии со ст.19 п.6 Закона РФ «О защите прав потребителей» я могу обратиться за защитой прав в течении {0} со дня получения товара.';

                    srokCases = {
                        yesGarant: yesMessage.format('гарантийный срок/срок годности {0}'),                        
                        defaultGarant: defaultMessage.format('гарантийный срок/срок годности') + ' однако в силу ст. 19 п.1 Закона РФ «О защите прав потребителей» я могу обратиться за защитой прав в течении 2 лет со дня получения товара',
                        yesSluzhba: yesMessage.format('срок службы {0}')
                    }

                    angular.extend(srokCases, {
                        yesGarantWithFlag: srokCases.yesGarant + flagMessage.format('2 лет'),
                        yesSluzhbaWithFlag: srokCases.yesSluzhba + flagMessage.format('10 лет'),
                        defaultSluzhbaWithFlag: defaultMessage.format('срок службы') + flagMessage.format('10 лет')
                    });
                }

                init();
            }
        };
    };
})()