(function () {
    'use strict';

    angular.module('LASite.common')
    .directive('laWizard', [function () {
        return {            
            restrict: 'E',
            templateUrl: 'Scripts/app/common/components/Wizard/Wizard.html',
            replace: true,
            transclude: true,
            scope: {
                formSubmit: '&'
            },
            link: function ($scope, element, attrs) {
                $scope.showNextStep = function () {
                    makeValidation(function () {
                        switchStep(1);
                    });
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

                $scope.getDoc = function () {
                    makeValidation(function () {
                        $scope.formSubmit();
                    })
                }

                var makeValidation = function (callback) {
                    $scope.wizardForm.submitted = false;

                    //Get currently open step
                    var currentStep = getCurrentStep();

                    //Find invalid inputs
                    var invalidInputs = currentStep.find('.ng-invalid');

                    if (invalidInputs.length > 0) {
                        //Display errors
                        $scope.wizardForm.submitted = true;
                        //Set focus to first invalid                        
                        invalidInputs[0].focus();
                    }
                    else {
                        //Current step is valid
                        callback();
                    }
                }

                var switchStep = function (n) {
                    //Deactivate current tab
                    var currentStep = getCurrentStep();
                    currentStep.removeClass('active');

                    //Find next tab
                    var steps = $('.wizard-body .wizard-step');
                    var index = steps.index(currentStep);
                    index += n;
                    $(steps[index]).addClass('active');

                    $scope.showSubmitButton = steps.length == index + 1;
                    $scope.showBackButton = !(index == 0 && n == -1);
                    
                    $scope.progressBar = {
                        percent: parseInt(index / (steps.length - 1) * 100) + '%',
                        steps: index > 0 && "{0}/{1}".format(index, steps.length - 1)
                    };

                    //Scroll top
                    $(window).scrollTop(0);
                }

                var showFirstStep = function () {
                    //Show first wizard step
                    var firstChildSteps = $('.wizard-body').children().first().find('.wizard-step');

                    if (firstChildSteps.length > 0) {
                        firstChildSteps.first().addClass('active');
                        $scope.progressPercent = 0;                       
                    }
                    else {
                        setTimeout(showFirstStep, 50);
                    }
                }
                
                var getCurrentStep = function () {
                    return $('.wizard-body .wizard-step.active');
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