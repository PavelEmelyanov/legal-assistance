(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laAlertDanger', [function () {
        return {            
            restrict: 'E',
            template: '<div class="style-msg errormsg"><div class="sb-msg"><i class="icon-remove"></i><span ng-transclude><span></div></div>',
            replace: true,
            transclude: true
        };
    }]);
})()