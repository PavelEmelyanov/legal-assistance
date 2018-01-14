(function () {
    'use strict';

    angular
        .module('LASite.common')
        .constant('DocToViewConfig', docToViewConfig());

    function docToViewConfig() {
        var baseHref = document.getElementsByTagName('base')[0].getAttribute('href');
        var docFolder = baseHref + 'Scripts/app/documents';

        //File name is key
        var result = {
            docFolder: docFolder,
            'zamena-tovara-nenadlezhashego-kachestva': docFolder + '/zamena-tovara-nenadlezhashego-kachestva/ZamenaTovaraNenadlezhashegoKachestva.html',
            'vozvrat-tovara-deneg': docFolder + '/vozvrat-tovara/VozvratTovara.html',
            'vozmeshenie-rashodov-na-ustranenie-nedostatkov-tovara': docFolder + '/vozmeshenie-rashodov-na-ustranenie-nedostatkov-tovara/VozmeshenieRashodovNaUstranenieNedostatkovTovara.html',
            'sorazmernoe-umenshenie-pokupnoy-ceni-tovara': docFolder + '/sorazmernoe-umenshenie-pokupnoy-ceni-tovara/SorazmernoeUmensheniePokupnoyCeniTovara.html'
        }

        return result;
    };
})();