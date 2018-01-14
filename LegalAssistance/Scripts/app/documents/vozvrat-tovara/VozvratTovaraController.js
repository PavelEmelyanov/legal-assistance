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
                return "продавцу/изготовителю для возврата денег за некачественный товар"
            },
            getActionText: function () {
                return 'вернуть деньги за некачественный товар';
            }
        }

        $scope.settings.getOnEndTargetText = $scope.settings.getOnStartTargetText;
    }
})();