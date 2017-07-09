(function () {
    angular.module('LASite.common')
        .filter('rub', [function () {
            return function (input) {
                if (angular.utils.isNotNullOrEmpty(input)) {
                    return angular.utils.toRub(input);
                } else {
                    return input;
                }
            }
        }]);
})();