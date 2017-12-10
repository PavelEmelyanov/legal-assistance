(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laValidateExpression', laValidateExpression)        

    function laValidateExpression() {
        return {
            require: '^form',
            restrict: 'E',
            template: '<span class="expression-invalid" ng-class="{\'ng-invalid\': !isValid() }" ng-show="showInvalid()" ng-transclude></span>',
            transclude: true,
            replace: true,
            scope: {
                isValid: '&',
            },
            link: function ($scope, element, attrs, formCtrl) {
                $scope.showInvalid = function () {
                    return formCtrl
                        && formCtrl.submitted
                        && $scope.isValid
                        && !$scope.isValid();
                }
            }
        };
    }
})();