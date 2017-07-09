(function () {
    'use strict';

    angular.module('LASite.common', []);

    //Run block
    angular
        .module('LASite.common')
        .run(runBlock);

    runBlock.$inject = ['UtilsService'];

    function runBlock(utilsService) {
        utilsService.init();
    }
    //-----
})();