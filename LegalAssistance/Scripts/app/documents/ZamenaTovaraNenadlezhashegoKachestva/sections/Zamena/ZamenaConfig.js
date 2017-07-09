(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('ZamenaConfig', ZamenaConfig);

    ZamenaConfig.$inject =
        ['ComponentTypes'];

    function ZamenaConfig(componentTypes) {

        //File name is key
        var components = {
            obmenTovaraModel: {
                componentType: componentTypes.custom,
                componentInFileKey: "obmen-tovara-model",
                parseFunction: function (drugoyTovarFlag, model, articul) {
                    if (drugoyTovarFlag) {
                        if (angular.utils.isNotNullOrEmpty(articul)) {
                            return 'товар другой марки - {0}, артикул {1}'.format(model, articul);
                        } else {
                            return 'товар другой марки - {0}'.format(model);
                        }
                    } else {
                        return 'такой же товар'
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