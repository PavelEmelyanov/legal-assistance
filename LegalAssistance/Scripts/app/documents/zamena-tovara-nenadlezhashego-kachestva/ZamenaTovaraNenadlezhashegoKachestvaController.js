(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .controller('ZamenaTovaraNenadlezhashegoKachestvaController',
            ZamenaTovaraNenadlezhashegoKachestvaController);

    ZamenaTovaraNenadlezhashegoKachestvaController.$inject =
        ['$scope', 'DocumentService'];

    function ZamenaTovaraNenadlezhashegoKachestvaController($scope, documentService) {
        $scope.getDoc = function () {
            var mainDocument = $scope.$parent.MainDocument;            
            documentService.getDoc(mainDocument);
        }
    }
})();