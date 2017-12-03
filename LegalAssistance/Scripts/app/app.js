(function () {
    angular.module('LASite', [
        'LASite.common',
        'LASite.documents',
        'LASite.doc-components',
        'ui.bootstrap']);    

    //App controller
    angular
        .module('LASite')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', 'DocToViewConfig'];

    function AppController($scope, docToViewConfig) {
        $scope.MainDocument = angular.fromJson($('#doc-data-json').text());
        $scope.docUrl = docToViewConfig[$scope.MainDocument.FileName];

        console.log($scope.MainDocument);
    }
    //-----
})();