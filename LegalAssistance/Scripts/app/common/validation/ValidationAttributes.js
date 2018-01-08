(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laPositiveInt', laPositiveInt)
        .directive('laDigit', laDigit)
        .directive('laDateGreater', laDateGreater)
        .directive('laDateLess', laDateLess);

    function laPositiveInt() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                ctrl.$validators.positiveInt = function (modelValue, viewValue) {
                    var data = modelValue || viewValue;

                    return !angular.utils.isNotNullOrEmpty(data) 
                        || (/^[1-9][0-9]*$/.test(data));
                }                
            }
        };
    }

    function laDigit() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                ctrl.$validators.digit = function (modelValue, viewValue) {
                    var data = modelValue || viewValue;

                    return !angular.utils.isNotNullOrEmpty(data)
                        || (/^\d+$/.test(data));
                }
            }
        }
    }
    
    function laDateGreater() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                var targetDate = null;

                $scope.$watch(attrs.laDateGreater, function (value) {
                    targetDate = value;
                    ctrl.$validators.dateGreater(ctrl.$modelValue, ctrl.$viewValue);
                });

                ctrl.$validators.dateGreater = function (modelValue, viewValue) {
                    var currentDate = modelValue || viewValue;

                    var result = !targetDate 
                        || !currentDate 
                        || currentDate > targetDate;
                    
                    return result;
                }                
            }
        };
    }

    function laDateLess() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                var targetDate = null;

                $scope.$watch(attrs.laDateLess, function (value) {
                    targetDate = value;
                    ctrl.$validators.dateLess(ctrl.$modelValue, ctrl.$viewValue);
                });

                ctrl.$validators.dateLess = function (modelValue, viewValue) {
                    var currentDate = modelValue || viewValue;

                    var result = !targetDate
                        || !currentDate
                        || currentDate < targetDate;

                    return result;
                }
            }
        };
    }
})();