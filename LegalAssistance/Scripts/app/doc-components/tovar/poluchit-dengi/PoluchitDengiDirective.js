(function () {
    'use strict';

    PoluchitDengi.$inject = ['ComponentsToDtoService', 'ComponentTypes', '$http'];

    angular.module('LASite.doc-components')
        .directive('laPoluchitDengi', PoluchitDengi);

    function PoluchitDengi(componentsToDtoService, componentTypes, $http) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/tovar/poluchit-dengi/PoluchitDengi.html',
            scope: true,
            link: function ($scope, element, attrs) {

                var init = function () {
                    $scope.components = {
                        sposobPoluchitDengi: {
                            componentType: componentTypes.custom,
                            componentInFileKey: "sposob-poluchit-dengi",
                            getValue: function () {
                                if ($scope.options.flag) {
                                    if ($scope.options.bikInfo) {
                                        return 'на счёт БИК: {0}, {1}, К/C: {2}, Р/C: {3}'.format(
                                            $scope.options.bikInfo.bik,
                                            $scope.options.bikInfo.name,
                                            $scope.options.bikInfo.ks,
                                            $scope.options.rs);
                                    }
                                    else {
                                        return 'на счёт БИК: {0}, Р/C: {1}'.format(
                                            $scope.options.bik,                                            
                                            $scope.options.rs);
                                    }                                    
                                } else {
                                    return 'наличными или на банковскую карту'
                                }
                            }
                        },
                    }

                    $scope.options = {
                        flag: false
                    }

                    componentsToDtoService.registerComponents($scope.components);
                }

                $scope.getBikInfo = function () {
                    $scope.options.bikInfo = null;
                    $scope.options.bikNotFound = false;

                    if ($scope.options.bik && $scope.options.bik.length == 9) {
                        $scope.options.loading = true;

                        var url = 'http://www.bik-info.ru/api.html?type=json&bik={0}'.format($scope.options.bik);

                        $http.get(url)
                            .then(function (resp) {
                                var response = resp.data;

                                if (response.error) {
                                    if (response.error.indexOf('not found') > -1) {
                                        $scope.options.bikNotFound = true;
                                    }                                    
                                }
                                else {
                                    $scope.options.bikInfo = response;
                                }                                
                            })
                            .finally(function () {
                                $scope.options.loading = false;
                            });
                    }
                }

                init();
            }
        };
    };
})()