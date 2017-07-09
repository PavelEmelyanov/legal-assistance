(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('TovarConfig', TovarConfig);

    TovarConfig.$inject =
        ['ComponentTypes'];

    function TovarConfig(componentTypes) {

        //File name is key
        var components = {
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
                parseFunction: function (garantSrok, srokGodnosti, srokSluzhbi) {
                    var garantString = angular.utils.isNotNullOrEmpty(garantSrok)
                        ? 'гарантийный срок {0} месяцев'.format(garantSrok)
                        : null;

                    var srokGodnostiString = angular.utils.isNotNullOrEmpty(srokGodnosti)
                        ? 'срок годности {0} месяцев'.format(srokGodnosti)
                        : null;

                    var srokSluzhbiString = angular.utils.isNotNullOrEmpty(srokSluzhbi)
                        ? 'срок cлужбы {0} месяцев'.format(srokSluzhbi)
                        : null;

                    return angular.utils.buildSentence(garantString, srokGodnostiString, srokSluzhbiString);
                }
            },
            tovarNeOdnovremenno: {
                componentType: componentTypes.checkbox,
                componentInFileKey: "tovar-ne-odnovremenno",
                noText: 'В случае необходимости предоставить товар, прошу Вас уведомить меня о дате и месте передачи',
                removeLineIfResultIsEmpty: true,
            },
        }

        return {
            get: function () {
                return components;
            }
        };
    }
})();