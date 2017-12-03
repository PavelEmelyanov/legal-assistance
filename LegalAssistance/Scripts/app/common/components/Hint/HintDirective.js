(function () {
    angular.module('LASite.common')
    .directive('laHint', [function () {
        return {
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/Hint/Hint.html',
            replace: true,
            scope: {
                hint: '='
            },
            link: function ($scope, element, attrs, controllers) {
                $(element).tooltip({
                    title: $scope.hint,
                    placement: 'auto'
                });
            }
        };
    }]);
})();