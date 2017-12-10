(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laAlertInfo', [function () {
        return {            
            restrict: 'E',
            template: '<div class="style-msg infomsg"><div class="sb-msg"><i class="icon-info-sign"></i><span ng-transclude><span></div></div>',
            replace: true,
            transclude: true
        };
    }]);
})()