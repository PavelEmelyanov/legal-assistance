(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laPositiveInt', laPositiveInt);

    function laPositiveInt() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {               
                $scope.$watch(attrs.ngModel, function (data) {
                    if (!angular.utils.isNotNullOrEmpty(data) || (/^[1-9][0-9]*$/.test(data))) {
                        ctrl.$setValidity('positiveInt', true);
                    } else {
                        ctrl.$setValidity('positiveInt', false);
                    }
                });

                //var $el = $(element);

                //Only positive int
                //$el.inputmask('Regex', {
                //    regex: "^[1-9][0-9]*$"
                //});
            }
        };
    }
})();