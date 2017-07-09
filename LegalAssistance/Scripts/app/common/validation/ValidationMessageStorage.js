(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("ValidationMessageStorage", validationMessageStorage);

    function validationMessageStorage() {
        var factory = {
            getErrorMessages: function () {
                return {
                    required: 'Данное поле обязательно для заполнения.',
                    dateComplete: 'Данное поле обязательно для заполнения.',
                    editable: 'Пожалуйста найдите и выберите элемента из списка.',
                    email: 'Неверный формат имейла. Имейл должен содержать @ и \'.\'.',
                    digit: 'Поле должно содержать только цифры.',
                    decimal: 'Поле должно содержать только целые и дробные числа.',
                    positiveDecimal: 'Поле должно содержать только целые и дробные числа больше нуля.',
                    positiveInt: 'Поле должно содержать только целые числа больше нуля.',
                    lengthExceeded: 'Поле должно содержать менее 250 символов.',
                    areaLengthExceeded: 'Поле должно содержать менее 1024 символов.',
                    //-----
                    decimalZero: 'The field should be greater than or equal to 0 and contain only decimal numbers.',
                    intZero: 'The field should be greater than or equal to 0 and contain only integer numbers.',
                    int: 'The field should be integer number.',
                    percent: 'The field should be between 0 and 100 and contain only integer numbers or decimal numbers.',
                    passwordCustomer: 'Password should be at least 8 symbols length. It should contain at least one digit and one character.',
                    expDate: 'You can not use card which is already expired.',
                    date: 'The value should be date.',
                    dateGreater: 'End date should be greater than Start Date',
                    dateLess: 'Start date should be less than End Date.',
                    maxNumber: 'The field shouldn\'t contain number greater than 100000.',
                    notCompletelyFilled: 'The field is not completely filled.',
                    fileSize: 'File should have size less than 25 Mb.',
                    sum: 'The Reservations at Max and Min Discount sum should be less or equal to 100.',
                    ip: 'Invalid IP.',
                    ipAvaliable: 'Current IP is unavaliable, please enter another one.',
                    unique: 'The field should be unique.',
                    time: 'The time is invalid.',
                    passwordEqualToLogin: 'Password and login shouldn\'t be the same.',
                    textOnly: 'The field should contain only letters.',
                    alphanumeric: 'The field should be alphanumeric.'
                };
            }
        }

        return factory;
    }
})();

