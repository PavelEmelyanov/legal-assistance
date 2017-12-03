(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laRadioYesNo', [function () {
        return {
            require: ['ngModel', '^?form'],
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/RadioYesNo/RadioYesNo.html',
            replace: true,
            scope: {
                yesText: '@',
                noText: '@',
            },
            link: function ($scope, element, attrs, controllers) {
                var ngModelCtrl = controllers[0],
                    formCtrl = controllers[1];
                                
                $scope.onChange = function () {
                    ngModelCtrl.$setViewValue($scope.flag);
                };

                $scope.$watch(function () {
                    return ngModelCtrl.$modelValue;
                }, function (newValue) {
                    $scope.flag = newValue;
                });

                $scope.randomId1 = angular.utils.getRandomString();
                $scope.randomId2 = angular.utils.getRandomString();                
            }
        };
    }]);
})()