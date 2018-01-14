(function () {
    'use strict';

    angular.module('LASite.documents.SorazmernoeUmensheniePokupnoyCeniTovara')
        .controller('SorazmernoeUmensheniePokupnoyCeniTovaraController',
            SorazmernoeUmensheniePokupnoyCeniTovaraController);

    SorazmernoeUmensheniePokupnoyCeniTovaraController.$inject =
        ['$scope', 'DocumentService'];

    function SorazmernoeUmensheniePokupnoyCeniTovaraController($scope, documentService) {
        $scope.getDoc = function () {
            var mainDocument = $scope.$parent.MainDocument;            
            documentService.getDoc(mainDocument);
        }

        $scope.settings = {
            getOnStartTargetText: function () {
                return "продавцу/изготовителю для соразмерного уменьшения покупной цены товара"
            },
            getActionText: function () {
                return 'уменьшить покупную цену товара';
            }
        }

        $scope.settings.getOnEndTargetText = $scope.settings.getOnStartTargetText;
    }
})();