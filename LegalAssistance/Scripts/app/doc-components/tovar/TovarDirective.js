(function () {
    'use strict';

    Tovar.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovar', Tovar);

    function Tovar(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/Tovar.html',
            scope: {
                cenaTovara: '='
            },
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        dataPokupki: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'data-pokupki'
                        },
                        mestoPokupki: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'mesto-pokupki'
                        },
                        naimenovanieTovara: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'naimenovanie-tovara'
                        },
                        articul: {
                            componentType: componentTypes.checkboxWithInput,
                            componentInFileKey: "articul",
                            resultTextTemplate: ", Артикул {0}",
                        },
                        cenaTovara: {
                            componentType: componentTypes.rub,
                            componentInFileKey: 'cena-tovara',
                        },
                        imeetsyaLiDokument: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "imeetsya-li-dokument",
                            yesText: "Документ, подтверждающий факт покупки, имеется",
                        },
                        sutPretenzii: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'sut-pretenzii'
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
                        tovarNeOdnovremenno: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "tovar-ne-odnovremenno",
                            noText: 'В случае необходимости предоставить товар, прошу Вас уведомить меня о дате и месте передачи',
                            removeLineIfResultIsEmpty: true,
                        }
                    };

                    $scope.specSrokiInfo = {};

                    componentsToDtoService.registerComponents($scope.components);
                }                

                $scope.onCenaChange = function () {
                    $scope.cenaTovara = $scope.components.cenaTovara.value;
                }

                init();
            }
        };
    };
})()