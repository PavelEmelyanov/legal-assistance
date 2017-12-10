(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laAlertWarning', [function () {
        return {            
            restrict: 'E',
            template: '<div class="style-msg alertmsg"><div class="sb-msg"><i class="icon-warning-sign"></i><span ng-transclude><span></div></div>',
            replace: true,
            transclude: true
        };
    }]);
})()