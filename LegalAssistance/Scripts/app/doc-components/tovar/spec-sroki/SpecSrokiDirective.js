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
                docDate: '=',
                potreblyamiiTovar: '=',
                obichniiNedostatok: '='
            },
            link: function ($scope, element, attrs) {

                var srokCases = {};

                var init = function () {                   
                    $scope.specSrokiInfo = {
                        success: true,
                        nedostatkiFlag: false
                    };

                    $scope.actionText = $scope.getActionText();
                    
                    $scope.potreblyamiiTovarInfo = {
                        options: [
                            {
                                key: 'Товар годен до (дата)',
                                value: 'date'
                            },
                            {
                                key: 'Срок годности в месяцах',
                                value: 'month'
                            },
                            {
                                key: 'Срок годности в сутках',
                                value: 'day'
                            }
                        ]
                    }

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

                    $scope.$watch('[dataPokupki, docDate, potreblyamiiTovar, obichniiNedostatok]', function (newValue) {
                        $scope.specSrokiInfo.showNedostatkiFlag = false;
                        $scope.specSrokiInfo.nedostatkiFlag = false;

                        if (newValue[0] && newValue[1]) {
                            if ($scope.potreblyamiiTovar) {
                                $scope.checkSrokGodnosti();
                            }
                            else {
                                //При обычной недостатке срок службы не 
                                //действует
                                if ($scope.obichniiNedostatok) {
                                    $scope.specSrokiInfo.srokSluzhbi = null;
                                }

                                $scope.checkSroki();
                            }                            
                        }                        
                    })
                }

                //Срок годности логика
                //----
                $scope.checkSrokGodnosti = function () {
                    if ($scope.potreblyamiiTovarInfo.selectedOption) {
                        var dataPokupki = $scope.dataPokupki,
                            docDate = $scope.docDate,
                            date = $scope.potreblyamiiTovarInfo.data,
                            sutki = $scope.potreblyamiiTovarInfo.sutki,
                            months = $scope.potreblyamiiTovarInfo.months,
                            key = $scope.potreblyamiiTovarInfo.selectedOption;

                        if (key == 'date') {
                            if (date >= docDate) {
                                setSuccessResult(srokCases.yesGodnostData, angular.utils.toDate(date))
                            }
                            else {
                                var errorMessage = "товар годен до {0} и его срок годости истечёт на момент подачи заявления {1}"
                                    .format(angular.utils.toDate(date), angular.utils.toDate(docDate));
                                setErrorResult(errorMessage);
                            }
                        } else {
                            var lastDate = angular.copy(dataPokupki);
                            var srokString;

                            //Добавить месяцы
                            if (key == 'month') {
                                lastDate.addMonths(months);
                                srokString = angular.utils.toMonths(months);
                            } else {
                                //Добавить сутки
                                lastDate.addDays(sutki);
                                srokString = angular.utils.toSutki(sutki);
                            }                            
                            
                            if (docDate < lastDate) {
                                setSuccessResult(srokCases.yesGodnost, srokString);
                            }
                            else {
                                var errorMessage = "товар годен до {0} - {1} и его срок годности истечёт на момент подачи заявления {2}"
                                    .format(angular.utils.toDate(lastDate), srokString, angular.utils.toDate(docDate));
                                setErrorResult(errorMessage);
                            }
                        }
                    }
                }
                //----

                //Гарантийный и срок службы логика
                //----
                $scope.checkSroki = function () {
                    var dataPokupki = $scope.dataPokupki,
                        docDate = $scope.docDate,
                        garantSrok = +$scope.specSrokiInfo.garantSrok,
                        srokSluzhbi = +$scope.specSrokiInfo.srokSluzhbi;

                    if (garantSrok && !srokSluzhbi) {
                        //Если гарантиный срок установлен и НЕ установлен срок службы
                        checkGarantSrok(dataPokupki, docDate, garantSrok);
                    }
                    else if (!garantSrok && srokSluzhbi) {
                        //Если срок службы установлен и НЕ установлен гарантиный срок                        
                        checkSrokSluzhbi(dataPokupki, docDate, srokSluzhbi);
                    }
                    else if (garantSrok && srokSluzhbi) {
                        //Если срок службы установлен и установлен гарантиный срок                        
                        checkAllSroks(dataPokupki, docDate, garantSrok, srokSluzhbi);
                    }
                    else {
                        //Ни один из сроков не установлен                        
                        checkDefaultSroki(dataPokupki, docDate);
                    }
                }

                //Только гарантиный срок установлен
                function checkGarantSrok(dataPokupki, docDate, srok) {
                    var lastDate = angular.copy(dataPokupki),
                        nedostatkiSrok = 24,
                        errorMessage = 'гарантийный срок {0} истечёт на момент подачи заявления {1}'
                            .format(angular.utils.toMonths(srok), angular.utils.toDate(docDate));

                    lastDate.addMonths(srok);

                    if (docDate < lastDate) {
                        //Гарантиный срок успешен
                        setSuccessResult(srokCases.yesGarant, angular.utils.toMonths(srok));
                        $scope.specSrokiInfo.showNedostatkiFlag = false;
                    }
                    else {
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(nedostatkiSrok)

                        //Проверяем прошло ли 2 года
                        if (docDate < lastDate) {
                            //НЕ прошло 2 года
                            $scope.specSrokiInfo.showNedostatkiFlag = true;

                            if ($scope.specSrokiInfo.nedostatkiFlag) {
                                setSuccessResult(srokCases.yesGarantWithFlag, angular.utils.toMonths(srok));
                            }
                            else {
                                setErrorResult(errorMessage, true);
                            }
                        }
                        else {
                            //Прошло 2 года
                            $scope.specSrokiInfo.showNedostatkiFlag = false;
                            $scope.specSrokiInfo.nedostatkiFlag = false;
                            setErrorResult(errorMessage, false);
                        }
                    }
                }

                //Только срок службы установлен
                function checkSrokSluzhbi(dataPokupki, docDate, srok) {
                    var lastDate = angular.copy(dataPokupki),                        
                        errorMessage = 'срок службы {0} истечёт на момент подачи заявления {1}'
                            .format(angular.utils.toMonths(srok), angular.utils.toDate(docDate));

                    //Проверяем гарантиный срок по умолчанию 2 года
                    lastDate.addMonths(24);

                    if (docDate < lastDate) {
                        //Гарантиный срок успешен
                        setSuccessResult(srokCases.defaultGarant);                        
                    }
                    else {
                        //2 года прошло - проверяем срок службы
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(srok)

                        if (docDate < lastDate) {
                            //Срок службы успешен
                            setSuccessResult(srokCases.yesSluzhba, angular.utils.toMonths(srok));
                        }
                        else {
                            //Срок службы не успешен                            
                            setErrorResult(errorMessage, false);
                        }
                    }

                    $scope.specSrokiInfo.showNedostatkiFlag = false;
                    $scope.specSrokiInfo.nedostatkiFlag = false;
                }

                //И гарантиный и срок службый установлены
                function checkAllSroks(dataPokupki, docDate, garantSrok, srokSluzhbi) {                    
                    var lastDate = angular.copy(dataPokupki),
                        garantErrorMessage = 'гарантийный срок {0} истечёт на момент подачи заявления {1}'
                            .format(angular.utils.toMonths(garantSrok), angular.utils.toDate(docDate)),
                        sluzhbaErrorMessage = 'срок службы {0} истечёт на момент подачи заявления {1}'
                            .format(angular.utils.toMonths(srokSluzhbi), angular.utils.toDate(docDate));

                    //Сначала проверяем гарантиный срок
                    lastDate.addMonths(garantSrok);

                    if (docDate < lastDate) {
                        //Гарантиный срок успешен
                        setSuccessResult(srokCases.yesGarant, angular.utils.toMonths(garantSrok));
                        $scope.specSrokiInfo.showNedostatkiFlag = false;
                    }
                    else {
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(24)

                        //Проверяем прошло ли 2 года
                        if (docDate < lastDate) {
                            //НЕ прошло 2 года
                            $scope.specSrokiInfo.showNedostatkiFlag = true;

                            if ($scope.specSrokiInfo.nedostatkiFlag) {
                                setSuccessResult(srokCases.yesGarantWithFlag, angular.utils.toMonths(garantSrok));
                            }
                            else {
                                setErrorResult(garantErrorMessage, true);
                            }
                        }
                        else {
                            //Прошло 2 года
                            //Проверяем срок службы
                            lastDate = angular.copy(dataPokupki);
                            lastDate.addMonths(srokSluzhbi)

                            if (docDate < lastDate) {
                                //Срок службы успешен
                                setSuccessResult(srokCases.yesSluzhba, angular.utils.toMonths(srokSluzhbi));
                            }
                            else {
                                //Срок службы не успешен                            
                                setErrorResult(sluzhbaErrorMessage, false);
                            }

                            $scope.specSrokiInfo.showNedostatkiFlag = false;
                            $scope.specSrokiInfo.nedostatkiFlag = false;
                        }
                    }
                }

                //Ни один из сроков не установлен
                function checkDefaultSroki(dataPokupki, docDate) {
                    var lastDate = angular.copy(dataPokupki),
                        defaultGarantSrok = 24,
                        defaultSrokSluzhbi = 120,
                        errorMessage = 'установленные законом гарантийный срок 2 года и срок службы 10 лет истекли';

                    //Проверяем дефолтный гарантийный срок 2 года
                    lastDate.addMonths(defaultGarantSrok);

                    if (docDate < lastDate) {
                        setSuccessResult(srokCases.defaultGarant);
                    }
                    else {
                        //Проверяем срок 10 лет
                        lastDate = angular.copy(dataPokupki);
                        lastDate.addMonths(defaultSrokSluzhbi);

                        if (docDate < lastDate) {
                            //Срок службы успешен
                            setSuccessResult(srokCases.defaultSluzhba);
                        }
                        else {
                            //Срок службы не успешен
                            setErrorResult(errorMessage);
                        }
                    }

                    $scope.specSrokiInfo.showNedostatkiFlag = false;
                    $scope.specSrokiInfo.nedostatkiFlag = false;
                }
                //---

                function setSuccessResult(srokCase, srok) {
                    $scope.specSrokiInfo.success = true;
                    $scope.specSrokiInfo.successMessage = srok 
                        ? srokCase.format(srok)
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
                    var defaultMessage = 'На данный товар не установлен {0}'                    

                    srokCases = {
                        yesGarant: yesMessage.format('гарантийный срок {0}'),
                        defaultGarant: defaultMessage.format('гарантийный срок') + ', однако в силу ст. 19 п.1 Закона РФ «О защите прав потребителей» я могу обратиться за защитой прав в течении 2 лет со дня получения товара.',
                        yesGarantWithFlag: yesMessage.format('гарантийный срок {0}') + ' Однако недостатки товара возникли по причинам, возникшим до передачи товара покупателю и в соответствии со ст.19 п.5 Закона РФ «О защите прав потребителей» я могу обратиться за защитой прав в течении 2 лет со дня получения товара.',

                        yesGodnost: 'На данный товар установлен срок годности {0}.',
                        yesGodnostData: 'Данный товар годен до {0}.',

                        yesSluzhba: yesMessage.format('срок службы {0}'),
                        defaultSluzhba: defaultMessage.format('срок службы') + ', однако в силу ст.19 п.6 Закона РФ «О защите прав потребителей» я могу обратиться за защитой прав в течении 10 лет со дня получения товара.'
                    }
                }

                init();
            }
        };
    };
})()