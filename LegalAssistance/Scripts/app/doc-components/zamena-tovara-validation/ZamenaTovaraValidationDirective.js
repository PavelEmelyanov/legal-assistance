(function () {
    'use strict';

    ZamenaTovaraValidation.$inject = ['ComponentsToDtoService', 'ComponentTypes', '$rootScope'];

    angular.module('LASite.doc-components')
        .directive('laZamenaTovaraValidation', ZamenaTovaraValidation);

    function ZamenaTovaraValidation(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/zamena-tovara-validation/ZamenaTovaraValidation.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.techSlozhniyTovar = {
                        flag: false,
                        sluchay: 0
                    };

                    $scope.sroki = {
                        showAlert: false
                    };


                    $scope.specSrokiInfo = {
                        defaultSrok: 24
                    };

                    $scope.components = {
                        dataPokupki: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'data-pokupki'
                        },
                        specSroki: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "spec-sroki",
                            removeLineIfResultIsEmpty: true,
                            getValue: function () {
                                var garantString = angular.utils.isNotNullOrEmpty($scope.specSrokiInfo.garantSrok)
                                    ? 'гарантийный срок {0} месяцев'.format($scope.specSrokiInfo.garantSrok)
                                    : null;

                                var srokGodnostiString = angular.utils.isNotNullOrEmpty($scope.specSrokiInfo.srokGodnosti)
                                    ? 'срок годности {0} месяцев'.format($scope.specSrokiInfo.srokGodnosti)
                                    : null;

                                var srokSluzhbiString = angular.utils.isNotNullOrEmpty($scope.specSrokiInfo.srokSluzhbi)
                                    ? 'срок cлужбы {0} месяцев'.format($scope.specSrokiInfo.srokSluzhbi)
                                    : null;

                                return angular.utils.buildSentence(garantString, srokGodnostiString, srokSluzhbiString);
                            }
                        },
                    }
                    
                    componentsToDtoService.registerComponents($scope.components);
                }

                $scope.checkSroki = function () {
                    var dataPokupki = $scope.components.dataPokupki.value;

                    if (dataPokupki) {
                        var lastDate = angular.copy(dataPokupki);

                        //Get max srok tovara
                        var maxSrok = getMaxSrok();

                        //Data kogda srok konchaetsa
                        lastDate.addMonths(maxSrok.value);
                        
                        $scope.sroki.showAlert = new Date() > lastDate;

                        if ($scope.sroki.showAlert) {
                            $scope.sroki.srokName = maxSrok.message.format(angular.utils.toMonths(maxSrok.value));                            
                        }
                        else {
                            $scope.sroki.srokName = null;
                        }
                    }                    
                }                

                function getMaxSrok() {
                    var srokiTypes = [
                        {
                            key: 'garantSrok',
                            message: 'истёк его гарантийный срок - {0}'
                        },
                        {
                            key: 'srokGodnosti',
                            message: 'истёк его срок годности - {0}'
                        },
                        {
                            key: 'srokSluzhbi',
                            message: 'истёк его срок службы - {0}'
                        }
                    ];

                    var max = srokiTypes[0];

                    angular.forEach(srokiTypes, function (type) {
                        var srok = $scope.specSrokiInfo[type.key];

                        if (angular.utils.isNotNullOrEmpty(srok) && (!max.value || srok > max.value)) {
                            max = type;
                            max.value = srok;
                        }
                    });

                    if (!max.value) {
                        max = {
                            key: 'defaultSrok',
                            message: 'прошло больше чем {0}',
                            value: 24
                        };
                    }

                    return max;
                }

                init();
            }
        };
    };
})()