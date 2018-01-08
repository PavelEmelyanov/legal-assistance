﻿(function () {
    'use strict';

    angular
        .module('LASite.common')
        .directive('laDate', laDate);

        function laDate() {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, element, attrs, ctrl) {
                    var currentYear = new Date().getFullYear();
                    var $el = $(element);

                    $el.attr('placeholder', 'ДД.MM.ГГГГ');

                    $el.inputmask('dd.mm.yyyy', {
                        yearrange: { minyear: currentYear - 15, maxyear: currentYear + 15 },
                        showMaskOnHover: false,
                        placeholder: 'ДД.MM.ГГГГ',
                        clearIncomplete: true
                    });

                    var startDate = angular.isDefined(attrs.laDateNoPast)
                        ? new Date()
                        : null;

                    var endDate = angular.isDefined(attrs.laDateNoFuture)
                        ? new Date()
                        : null;

                    $el.datepicker({
                        language: 'ru-RU',
                        format: 'dd.mm.yyyy',
                        startDate: startDate,
                        endDate: endDate,
                        autoclose: true
                    });

                    ctrl.$formatters.push(function (modelValue) {
                        if (angular.utils.isNotNullOrEmpty(modelValue) && angular.isDate(modelValue)) {
                            return angular.utils.toDate(modelValue);
                        } else {
                            return null;
                        }
                    });

                    ctrl.$parsers.push(function (viewValue) {
                        if (viewValue == $el.inputmask("getemptymask")) {
                            return null;
                        }

                        if (angular.utils.isNotNullOrEmpty(viewValue)) {
                            if (!$el.inputmask('isComplete')) {
                                //ctrl.$setValidity('dateComplete', false);
                                return null;
                            } else {
                               // ctrl.$setValidity('dateComplete', true);
                                var date = viewValue.match(/\d+/ig);
                                //Years, months, days, hours, minutes
                                return new Date(date[2], date[1] - 1, date[0], 0, 0, 0, 0);
                            }
                        } else {
                            return null;
                        }
                    });
                }
            };
        };
}())

