angular.module('LASite.common')
    .directive('laCheckboxWithInput', [function () {
        return {
            require: ['ngModel', '^?form'],
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/CheckboxWithInput/CheckboxWithInput.html',
            replace: true,
            transclude: true,
            scope: {
                flag: '=',
                placeholder: '@'
            },
            compile: function (tElement, tAttrs, transclude) {
                //Set validation attributes to input
                if (angular.utils.isNotNullOrEmpty(tAttrs.validation)) {
                    $(tElement).find('input[type=text]').attr(tAttrs.validation, '');
                }
            },
            link: function ($scope, element, attrs, controllers) {
                var ngModelCtrl = controllers[0],
                    formCtrl = controllers[1];
                                
                $scope.onChange = function () {
                    if ($scope.flag) {                        
                        ngModelCtrl.$setViewValue($scope.text);
                    } else {
                        ngModelCtrl.$setViewValue(null);
                    }                                                         
                };
            }
        };
    }]);