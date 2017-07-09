(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('TovarNaPeriodZameniConfig', TovarNaPeriodZameniConfig);

    TovarNaPeriodZameniConfig.$inject =
        ['ComponentTypes'];

    function TovarNaPeriodZameniConfig(componentTypes) {

        //File name is key
        var components = {
            analogichniyTovarNaimenovanie: {
                componentType: componentTypes.custom,
                componentInFileKey: 'analog-tovar-naimenovanie',
                removeLineIfResultIsEmpty: true,
                parseFunction: function (flag, naimenovanie) {
                    if (flag) {
                        return naimenovanie;
                    } else {
                        return null;
                    }
                }
            },
            analogichniyTovarArticul: {
                componentType: componentTypes.custom,
                componentInFileKey: 'analog-tovar-articul',
                removeLineIfResultIsEmpty: true,
                parseFunction: function (flag, articulFlag, articul) {
                    if (flag && articulFlag) {
                        return ", Артикул {0}".format(articul);
                    } else {
                        return null;
                    }
                }
            },
        }

        return {
            get: function () {
                return components;
            }
        };
    }
})();