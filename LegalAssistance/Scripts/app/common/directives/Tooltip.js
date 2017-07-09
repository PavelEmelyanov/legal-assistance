(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laTooltip', function() {
            return {
                restrict: 'A',
                link: function ($scope, element, iAttrs, ctrl) {                   
                    iAttrs.$observe('laTooltip', function (value) {
                        element.tooltip('destroy');
                        element.tooltip({
                            title: value,
                            placement: 'auto'
                        });
                    });

                    $scope.$on('$destroy', function () {
                        element.tooltip('destroy');
                    });
                }
            };
        });        
}())

