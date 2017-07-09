(function () {
    'use strict';

    angular
        .module('LASite.common')
        .constant('ComponentTypes', {
            'input': 'input',
            'rub': 'rub',
            'checkbox': 'checkbox',
            'radioGroup': 'radioGroup',
            'select': 'select',
            'date': 'date',
            'checkboxWithInput': 'checkboxWithInput',
            'textarea': 'textarea',
            'custom': 'custom'
        });
})();



//angular.module('LASite.common')
//    .constant('ComponentTypes', {
//        1: 'input',
//        2: 'checkbox',
//        3: 'radioGroup',
//        4: 'select',
//        5: 'date',
//        6: 'checkboxWithInput',
//        7: 'textarea',
//        8: 'custom'
//    });