(function () {
    'use strict';
    
    DocOnStart.$inject = ['$sce']

    angular.module('LASite.doc-components')
        .directive('laDocOnStart', DocOnStart);

    function DocOnStart($sce) {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/doc-components/doc-on-start/DocOnStart.html',
            scope: {
                getTargetText: '&',
                getActionText: '&',
            },
            link: function ($scope, element, attrs) {

                var init = function () {
                    var points = [
                        'Сейчас Вам будет предложено заполнить форму. В конце Вы <span class="color">получите готовое заявление</span>. Данное заявление можно распечатать и <span class="color"> предъявить {0}</span>.'.format($scope.getTargetText()),                        
                        'В процессе заполнения формы, <span class="color">Вы узнаете, можете ли Вы {0} и что ещё Вы в праве требовать</span>. Например, в некоторых случаях вы в праве потребовать пеню.'.format($scope.getActionText()),
                        'Сайт "ЮРобот" <span class="color">не хранит ваши персональные данные</span> и использует их только для подготовки заявления.',
                        'Это бесплатно и не требует регистрации на сайте.',
                    ];

                    $scope.points = points.map(function (point) {
                        return $sce.trustAsHtml(point);
                    });
                }

                init();
            }
        };
    };
})()