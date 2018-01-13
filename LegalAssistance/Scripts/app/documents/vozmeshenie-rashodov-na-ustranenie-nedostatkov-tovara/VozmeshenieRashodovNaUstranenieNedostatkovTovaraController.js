(function () {
    'use strict';

    angular.module('LASite.documents.VozmeshenieRashodovNaUstranenieNedostatkovTovara')
        .controller('VozmeshenieRashodovNaUstranenieNedostatkovTovaraController',
            VozmeshenieRashodovNaUstranenieNedostatkovTovaraController);

    VozmeshenieRashodovNaUstranenieNedostatkovTovaraController.$inject =
        ['$scope', 'DocumentService'];

    function VozmeshenieRashodovNaUstranenieNedostatkovTovaraController($scope, documentService) {
        $scope.getDoc = function () {
            var mainDocument = $scope.$parent.MainDocument;            
            documentService.getDoc(mainDocument);
        }

        $scope.settings = {
            getOnStartTargetText: function () {
                return "продавцу/изготовителю для возмещения расходов на устранение недостатков товара"
            },
            getActionText: function () {
                return 'возместить расходы на устранение недостатков товара';
            }
        }

        $scope.settings.getOnEndTargetText = $scope.settings.getOnStartTargetText;
    }
})();