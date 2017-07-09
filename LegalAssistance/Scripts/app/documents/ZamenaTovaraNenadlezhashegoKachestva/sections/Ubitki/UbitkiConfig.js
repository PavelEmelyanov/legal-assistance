(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('UbitkiConfig', UbitkiConfig);

    UbitkiConfig.$inject =
        ['ComponentTypes'];

    function UbitkiConfig(componentTypes) {

        //File name is key
        var components = {
            vozmeshenieUbitkovProsba: {
                componentType: componentTypes.custom,
                componentInFileKey: 'vozmeshenie-ubitkov-prosba',
                removeLineIfResultIsEmpty: true,
                parseFunction: function (flag, prosba) {
                    if (flag) {
                        return prosba + '.';
                    } else {
                        return null;
                    }
                }
            },
            vozmeshenieUbitkovSumma: {
                componentType: componentTypes.custom,
                componentInFileKey: 'vozmeshenie-ubitkov-summa',
                removeLineIfResultIsEmpty: true,
                parseFunction: function (flag, summa) {
                    if (flag) {
                        return angular.utils.toRub(summa);
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