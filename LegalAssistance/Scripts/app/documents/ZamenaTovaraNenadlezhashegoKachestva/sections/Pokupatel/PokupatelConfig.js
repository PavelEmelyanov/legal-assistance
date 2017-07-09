(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('PokupatelConfig', PokupatelConfig);

    PokupatelConfig.$inject =
        ['ComponentTypes'];

    function PokupatelConfig(componentTypes) {

        //File name is key
        var components = {
            pokupatel: {
                componentType: componentTypes.input,
                componentInFileKey: 'pokupatel'
            },
            addressPokupatel: {
                componentType: componentTypes.input,
                componentInFileKey: 'address-pokupatel'
            },
        }

        return {
            get: function () {
                return components;
            }
        };
    }
})();