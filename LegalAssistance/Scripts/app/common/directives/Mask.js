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
                $(element).inputmask(attrs.laMask);
            }
        };
    };
}())

