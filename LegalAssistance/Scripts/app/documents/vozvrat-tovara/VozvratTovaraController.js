(function () {
    'use strict';

    angular.module('LASite.documents.VozvratTovara')
        .controller('VozvratTovaraController',
            VozvratTovaraController);

    VozvratTovaraController.$inject =
        ['$scope', 'DocumentService'];

    function VozvratTovaraController($scope, documentService) {
        $scope.getDoc = function () {
            var mainDocument = $scope.$parent.MainDocument;            
            documentService.getDoc(mainDocument);
        }

        $scope.settings = {
            getOnStartTargetText: function () {
                return "продавцу/изготовителю для возврата товара ненадлежащего качества"
            },
            getActionText: function () {
                return 'вернуть товар ненадлежащего качества';
            }
        }

        $scope.settings.getOnEndTargetText = $scope.settings.getOnStartTargetText;
    }
})();