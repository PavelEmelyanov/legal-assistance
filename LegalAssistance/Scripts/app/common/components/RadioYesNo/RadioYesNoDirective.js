(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laRadioYesNo', [radioDirective(false)]);

    angular.module('LASite.common')
    .directive('laRadioYesNoHint', [radioDirective(true)]);

    function radioDirective(flag) {
        var scopeObj = {
            yesText: '@',
            noText: '@',
        },
        templateUrl;

        //With hints
        if (flag) {
            templateUrl = 'Scripts/app/common/components/RadioYesNo/RadioYesNoWithHint.html';
            angular.extend(scopeObj, {
                noHint: '=',
                yesHint: '='
            })
        }
        else {
            templateUrl = 'Scripts/app/common/components/RadioYesNo/RadioYesNo.html';
        }

        return function () {
            return {
                require: ['ngModel', '^?form'],
                restrict: 'E',
                templateUrl: templateUrl,
                replace: true,
                scope: scopeObj,
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

                    $scope.isValid = function () {
                        return $scope.flag === false
                            || $scope.flag === true;
                    }               
                }
            };
        }
    }
})()