(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("ValidationHelper", ValidationHelper);

    ValidationHelper.$inject = ['ValidationMessageStorage'];

    function ValidationHelper(validationMessageStorage) {
        //Helper functions for validation
        var defaultErrors = validationMessageStorage.getErrorMessages();
        var invalidCssClass = 'la-invalid-input';

        var factory = {
            renderErrors: function ($el, inputCtrl, formCtrl, attrs) {                
                var timeout = $el.data('bs.tooltip') ? 200 : 0;
                //Remove previous tooltip
                $el.tooltip('destroy');

                //If input is invalid 
                //and dirty or form has been submitted
                if (!inputCtrl.$valid
                    && (inputCtrl.$dirty || formCtrl.submitted)) {

                    $el.addClass(invalidCssClass);

                    //Timeout is need to correctly render tooltip
                    setTimeout(function () {
                        $el.tooltip({
                            title: internal.getErrorMessages(inputCtrl, attrs),
                            template: internal.getTooltipTemplate(),
                            placement: 'bottom',
                            trigger: 'manual'
                        });

                        $el.tooltip('show');
                    }, timeout);
                } else {                                  
                    $el.removeClass(invalidCssClass);
                }
            },            

            checkLength: function (data, limit) {
                if (data) {
                    data = data.toString();
                }

                return ((data == null) || (data == "") || (data && data.toString().length <= limit));
            }
        }

        var internal = {
            getErrorMessages: function (inputCtrl, attrs) {
                var customMessages = attrs.laValidationMessages ? $parse(attrs.laValidationMessages)() : {};

                var errorMessages = '';

                for (var name in inputCtrl.$error) {
                    if (inputCtrl.$error.hasOwnProperty(name)
                        && name != 'parse'
                        && inputCtrl.$error[name]) {

                        var message = customMessages[name] || defaultErrors[name] || 'Ошибка ввода.';
                        errorMessages += message + ' ';
                    }
                }

                return errorMessages;
            },

            getTooltipTemplate: function () {
                return '<div class="tooltip tooltip-invalid" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            },
        }

        return factory;
    }
})();

