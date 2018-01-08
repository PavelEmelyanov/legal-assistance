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
                            removeLineIfResultIsEmpty: true,
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
                        srokSluzhbi = +$scope.specSrokiInfo.srokSluzhbi,
                        defaultGarantSrok = 24,
                        defaultSrokSluzhbi = 120;

                    var lastDate = angular.copy(dataPokupki);

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
                            'срок службы {0} истёк'.format(angular.utils.toMonths(srokSluzhbi)));
                    }
                    else {
                        //Если ни один из сроков не установлен
                        //Берём срок службы по умолчанию - 10 лет
                        checkSrok(
                            dataPokupki,
                            docDate,
                            defaultSrokSluzhbi,
                            srokCases.defaultSluzhba,
                            srokCases.defaultSluzhbaWithFlag,
                            'установленный законом срок службы 10 лет истёк');
                    }
                }

                function checkSrok(dataPokupki, docDate, srok, srokCase, srokCaseWithFlag, errorMesage) {
                    var lastDate = angular.copy(dataPokupki),
                        nedostatkiSrok = 24;

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

                function setSuccessResult(srokCase, srok) {
                    $scope.specSrokiInfo.success = true;
                    $scope.specSrokiInfo.successMessage = srokCase.format(srok);
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
                        //--Not Used
                        defaultGarant: defaultMessage.format('гарантийный срок/срок годности'),
                        //--
                        yesSluzhba: yesMessage.format('срок службы {0}'),
                        defaultSluzhba: defaultMessage.format('срок службы')
                    }

                    angular.extend(srokCases, {
                        yesGarantWithFlag: srokCases.yesGarant + flagMessage.format('2 лет'),
                        //--Not Used                        
                        defaultGarantWithFlag: srokCases.defaultGarant + flagMessage.format('2 лет'),
                        //--                        
                        yesSluzhbaWithFlag: srokCases.yesSluzhba + flagMessage.format('10 лет'),
                        defaultSluzhbaWithFlag: srokCases.defaultSluzhba + flagMessage.format('10 лет')
                    });
                }

                init();
            }
        };
    };
})()