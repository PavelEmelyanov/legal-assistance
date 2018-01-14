(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("ComponentsToDtoService", ComponentsToDtoService);

    ComponentsToDtoService.$inject = ['ComponentTypes'];

    function ComponentsToDtoService(componentTypes) {

        var componentStorage = [];

        var factory = {
            registerComponents: function (componentObject) {
                for (var key in componentObject) {
                    componentStorage.push(componentObject[key]);
                }
            },

            getDocParams: function () {
                var result = componentStorage.map(function (component) {
                    var value;

                    //Custom Component
                    if (component.componentType == componentTypes.custom) {
                        value = component.getValue();
                    }
                        //Checkbox
                    else if (component.componentType == componentTypes.checkbox) {
                        value = component.value
                            ? 'true'
                            : null;
                    }
                        //Input, Rub, Radio Group, TextArea, Select, Checkbox with Input
                    else {
                        value = component.value;

                        if (component.componentType == componentTypes.checkboxWithInput
                            && !component.isSelected) {
                            value = null;
                        }

                        if (angular.isDate(value)) {
                            value = angular.utils.toDate(value);
                        }

                        if (component.componentType == componentTypes.rub) {
                            value = angular.utils.toRub(value);
                        }

                        if (angular.utils.isNotNullOrEmpty(value)
                            && component.resultTextTemplate) {
                            value = component.resultTextTemplate.format(value);
                        }
                    }

                    var param = {
                        key: component.componentInFileKey,
                        value: value
                    };

                    return param;
                });

                return result;
            },

            //Get specific parameters
            getDocDate: function () {
                return internal.getParamValue('doc-date');
            },

            getCenaTovara: function () {
                return internal.getParamValue('cena-tovara');
            }
        };

        var internal = {
            getParamValue: function (key) {
                var component = componentStorage.find(function (comp) {
                    return comp.componentInFileKey == key;
                });

                var result = component ? component.value : null;
                return result;
            }
        }

        return factory;
    }
})();