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

        $scope.settings = {
            getOnStartTargetText: function () {
                return "продавцу/изготовителю для замены некачественного товара"
            },
            getActionText: function () {
                return 'заменить некачественный товар';
            }
        }

        $scope.settings.getOnEndTargetText = $scope.settings.getOnStartTargetText;
    }
})();