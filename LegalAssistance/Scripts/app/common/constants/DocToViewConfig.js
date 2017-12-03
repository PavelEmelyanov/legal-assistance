(function () {
    'use strict';

    angular
        .module('LASite.common')
        .constant('DocToViewConfig', docToViewConfig());

    function docToViewConfig() {
        var docFolder = '/LegalAssistance/Scripts/app/documents';

        //File name is key
        var result = {
            docFolder: docFolder,
            'zamena-tovara-nenadlezhashego-kachestva': docFolder + '/zamena-tovara-nenadlezhashego-kachestva/ZamenaTovaraNenadlezhashegoKachestva.html'
        }

        return result;
    };
})();