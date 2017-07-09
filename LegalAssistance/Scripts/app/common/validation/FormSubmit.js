(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive("laSubmit", laSubmit);

    function laSubmit() {
        return {
            require: 'form',
            restrict: 'A',
            scope: {
                fn: '&laSubmit'
            },
            link: function (scope, formElement, attrs, formCtrl) {
                formCtrl.submitted = false;

                formElement.bind('submit', function (event) {
                    // if form is not valid cancel it.
                    if (!formCtrl.$valid) {                        
                        scope.$apply(function () {
                            setFocusToFirstInvalidInput();
                            formCtrl.submitted = true;
                        });
                        
                        return false;
                    } else {

                        formCtrl.submitted = false;

                        var button = $(formElement).find('button[type=submit]');

                        button.attr('disabled', 'disabled');
                        setTimeout(function () {
                            button.removeAttr('disabled');
                        }, 3000);

                        scope.$apply(function () {
                            scope.fn({ $event: event });
                        });
                    }
                });

                function setFocusToFirstInvalidInput() {
                    setTimeout(function () {
                        var invalid = $('input.ng-invalid');

                        if (invalid[0]) {
                            invalid[0].focus();
                        }
                    }, 100);
                }

                scope.$on('$destroy', function () {
                    formElement.unbind();
                });
            }
        };
    };
})();