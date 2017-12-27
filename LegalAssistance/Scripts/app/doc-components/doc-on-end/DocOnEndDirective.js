(function () {
    'use strict';    
    
    angular.module('LASite.doc-components')
        .directive('laDocOnEnd', DocOnEnd);

    function DocOnEnd() {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/doc-on-end/DocOnEnd.html',
            scope: {
                getTargetText: '&'
            },
            link: function ($scope, element, attrs) {

                var init = function () {
                    //Insert social buttons
                    setTimeout(function () {
                        var icons = $('.la-social-icon').first().clone();
                        $('.js-insert-social-icons').append(icons)
                    }, 300);

                    $scope.targetText = $scope.getTargetText();

                    //Init support project button
                    SEMICOLON.initialize.lightbox()
                }

                init();
            }
        };
    };
})()