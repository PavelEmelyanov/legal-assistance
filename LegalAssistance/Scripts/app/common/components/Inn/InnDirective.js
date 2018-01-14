(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laInn', laInn);

    laInn.$inject = ['$http', '$timeout'];

    function laInn($http, $timeout) {
        return {            
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/Inn/Inn.html',
            replace: true,
            scope: {
                inn: '=',
                ogrn: '=',
                name: '=',
                address: '='
            },
            link: function ($scope, element, attrs) {
                var url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
                var headers = {
                    'Authorization': 'Token 922c36510a7e7096203e2297245cf49af1f482c9'
                }

                $scope.searchOrg = function (value) {
                    return $http.post(url,
                        { query: value, count: 5 },
                        { headers: headers })
                        .then(function (response) {
                            return response.data.suggestions;
                        })
                }

                $scope.onOrgSelect = function () {
                    $scope.inn = $scope.orgInfo.data.inn;
                    $scope.ogrn = $scope.orgInfo.data.ogrn;
                    $scope.name = $scope.orgInfo.value;
                    $scope.address = $scope.orgInfo.data.address.value
                }

                $scope.checkIsSelectFromList = function () {
                    //Timeout is to avoid validation
                    //tooltip blinking
                    $timeout(function () {
                        if (angular.isString($scope.orgInfo)) {
                            $scope.orgInfo = null;
                        }
                    }, 100)                    
                }
            }
        };
    }
})()

