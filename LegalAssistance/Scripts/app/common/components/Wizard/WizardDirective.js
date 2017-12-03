(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laWizard', [function () {
        return {            
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/Wizard/Wizard.html',
            replace: true,
            transclude: true,
            link: function ($scope, element, attrs, controllers) {

                $scope.showNextStep = function () {
                    switchStep(1);
                }

                $scope.showPreviousStep = function () {
                    switchStep(-1);
                }

                //Events
                $scope.$on('wizard:disable-next', function () {
                    $scope.disableNextButton = true;
                });

                $scope.$on('wizard:enable-next', function () {
                    $scope.disableNextButton = false;
                });

                var switchStep = function (n) {
                    //Deactivate current tab
                    var currentStep = $('.wizard-body .wizard-step.active');
                    currentStep.removeClass('active');

                    //Find next tab
                    var steps = $('.wizard-body .wizard-step');
                    var index = steps.index(currentStep);
                    index += n;
                    $(steps[index]).addClass('active');

                    $scope.showSubmitButton = steps.length == index + 1;
                    $scope.showBackButton = !(index == 1 && n == -1);
                }

                var showFirstStep = function () {
                    //Show first wizard step
                    var firstChildSteps = $('.wizard-body').children().first().find('.wizard-step');

                    if (firstChildSteps.length > 0) {
                        firstChildSteps.first().addClass('active');
                    }
                    else {
                        setTimeout(showFirstStep, 50);
                    }
                }
                
                var init = function () {
                    $scope.showBackButton = false;
                    showFirstStep();                           
                };

                init();
            }
        };
    }]);
})()