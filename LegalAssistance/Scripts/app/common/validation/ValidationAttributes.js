(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laPositiveInt', laPositiveInt)
        .directive('laDigit', laDigit);

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
})();