(function () {
    'use strict';

    Tovar.$inject = ['ComponentsToDtoService', 'ComponentTypes'];

    angular.module('LASite.doc-components')
        .directive('laTovar', Tovar);

    function Tovar(componentsToDtoService, componentTypes) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/Tovar.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {                        
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
                        imeetsyaLiDokument: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "imeetsya-li-dokument",
                            yesText: "Документ, подтверждающий факт покупки, имеется",
                        },
                        sutPretenzii: {
                            componentType: componentTypes.input,
                            componentInFileKey: 'sut-pretenzii'
                        },                        
                        tovarNeOdnovremenno: {
                            componentType: componentTypes.checkbox,
                            componentInFileKey: "tovar-ne-odnovremenno",
                            noText: 'В случае необходимости предоставить товар, прошу Вас уведомить меня о дате и месте передачи',
                            removeLineIfResultIsEmpty: true,
                        }
                    };

                    componentsToDtoService.registerComponents($scope.components);
                }                
                
                init();
            }
        };
    };
})()