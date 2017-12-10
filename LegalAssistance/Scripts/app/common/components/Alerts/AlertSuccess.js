(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laAlertSuccess', [function () {
        return {            
            restrict: 'E',
            template: '<div class="style-msg successmsg"><div class="sb-msg"><i class="icon-thumbs-up"></i><span ng-transclude><span></div></div>',
            replace: true,
            transclude: true
        };
    }]);
})()