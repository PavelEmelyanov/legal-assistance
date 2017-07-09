(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('input', inputDir)
        .directive('select', selectDir)
        .directive('textarea', textareaDir);

    inputDir.$inject = ['ValidationHelper', '$parse'];
    selectDir.$inject = ['ValidationHelper', '$parse'];
    textareaDir.$inject = ['ValidationHelper', '$parse'];

    function inputDir(validationHelper, $parse) {
        return {
            require: ['?ngModel', '^?form'],
            restrict: 'E',
            link: function (scope, ele, attrs, controllers) {
                var inputCtrl = controllers[0];
                var formCtrl = controllers[1];
                var $el = $(ele);

                if (!formCtrl || !inputCtrl || attrs.type == 'radio' || attrs.type == 'checkbox') {
                    return;
                }

                scope.$watch(function () { return inputCtrl.$error; }, renderErrors, true);
                scope.$watch(function () { return formCtrl.submitted; }, renderErrors);

                function renderErrors() {
                    validationHelper.renderErrors($el, inputCtrl, formCtrl, attrs);
                }

                if (!$el.attr('no-maxLength-validation')) {
                    scope.$watch(attrs.ngModel, function (data) {
                        inputCtrl.$setValidity('lengthExceeded', validationHelper.checkLength(data, 250));
                    });
                }
            }
        };
    }

    function selectDir(validationHelper, $parse) {
        return {
            require: ['?ngModel', '^?form'],
            restrict: 'E',
            link: function (scope, ele, attrs, controllers) {
                var inputCtrl = controllers[0];
                var formCtrl = controllers[1];
                var $el = $(ele);

                if (!formCtrl || !inputCtrl) {
                    return;
                }

                scope.$watch(function () { return inputCtrl.$error; }, renderErrors, true);
                scope.$watch(function () { return formCtrl.submitted; }, renderErrors);

                function renderErrors() {
                    validationHelper.renderErrors($el, inputCtrl, formCtrl, attrs);
                }
            }
        };
    }

    function textareaDir(validationHelper, $parse) {
        return {
            require: ['?ngModel', '^?form'],
            restrict: 'E',
            link: function (scope, ele, attrs, controllers) {
                var inputCtrl = controllers[0];
                var formCtrl = controllers[1];
                var $el = $(ele);

                if (!formCtrl || !inputCtrl || attrs.type == 'radio' || attrs.type == 'checkbox') {
                    return;
                }

                scope.$watch(function () { return inputCtrl.$error; }, renderErrors, true);
                scope.$watch(function () { return formCtrl.submitted; }, renderErrors);

                function renderErrors() {
                    validationHelper.renderErrors($el, inputCtrl, formCtrl, attrs);
                }

                if (!$el.attr('no-maxLength-validation')) {
                    scope.$watch(attrs.ngModel, function (data) {
                        inputCtrl.$setValidity('areaLengthExceeded', validationHelper.checkLength(data, 1024));
                    });
                }
            }
        };
    }
})();