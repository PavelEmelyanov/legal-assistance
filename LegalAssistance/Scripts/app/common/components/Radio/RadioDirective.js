(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laRadio', [function () {
        return {
            require: ['ngModel', '^?form'],
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/Radio/Radio.html',
            replace: true,
            transclude: true,
            scope: {
                ngModel: '=',
                ngValue: '='
            },
            link: function ($scope, element, attrs, controllers) {
                var ngModelCtrl = controllers[0];

                $scope.randomId = angular.utils.getRandomString();                

                $scope.onChange = function () {
                    ngModelCtrl.$setViewValue($scope.ngModel);                    
                }
            }
        };
    }]);
})()