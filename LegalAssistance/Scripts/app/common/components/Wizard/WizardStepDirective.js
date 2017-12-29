(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laWizardStep', [function () {
        return {
            require: '^laWizard',
            restrict: 'E',
            template: '<div class="wizard-step" ng-transclude></div>',
            replace: true,
            transclude: true,            
            link: function ($scope, element, attrs, wizardCtrl) {
                if (angular.isDefined(attrs.disabled)) {
                    $scope.$watch(attrs.disabled, function (value) {
                        if (value) {
                            element.addClass('disabled');
                        }
                        else {
                            element.removeClass('disabled');
                        }

                        wizardCtrl.setDisableNextButton();
                    })
                }
            }
        };
    }]);
})()