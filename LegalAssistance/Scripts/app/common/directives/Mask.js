(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laMask', laMask);

    function laMask() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {
                var $el = $(element);
                $el.inputmask(attrs.laMask, {
                    onincomplete: function () {
                        var isValid = !angular.utils.isNotNullOrEmpty($el.inputmask("unmaskedvalue"));
                        ctrl.$setValidity('maskCompleted', isValid);
                        $scope.$apply();
                    },
                    oncomplete: function () {
                        ctrl.$setValidity('maskCompleted', true);
                        $scope.$apply();
                    }
                });

                ctrl.$parsers.push(function (viewValue) {
                    if (viewValue == $el.inputmask("getemptymask")) {
                        return null;
                    }

                    if (angular.utils.isNotNullOrEmpty(viewValue)) {
                        if (!$el.inputmask('isComplete')) {                            
                            return null;
                        } else {
                            return viewValue;
                        }
                    } else {
                        return null;
                    }
                });
            }
        };
    };
}())

