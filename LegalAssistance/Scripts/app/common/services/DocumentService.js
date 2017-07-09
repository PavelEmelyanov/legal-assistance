(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("DocumentService", DocumentService);

    DocumentService.$inject = ['$http', 'ComponentTypes'];

    function DocumentService($http, componentTypes) {

        var factory = {
            getDocParams: function (formValues, componentConfig, onCustomComponentCallback) {
                var result = [];

                for (var key in componentConfig) {
                    var component = componentConfig[key],
                        value;

                    //Custom Component
                    if (component.componentType == componentTypes.custom) {
                        value = onCustomComponentCallback(key, component);
                    }
                        //Checkbox
                    else if (component.componentType == componentTypes.checkbox) {
                        value = formValues[key].value
                            ? component.yesText
                            : component.noText;
                    }
                        //Input, Rub, Radio Group, TextArea, Select, Checkbox with Input
                    else {
                        value = formValues[key].value;

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

                    result.push({
                        key: component.componentInFileKey,
                        value: value,
                        removeLineIfResultIsEmpty: component.removeLineIfResultIsEmpty
                    });
                }

                return result;
            },

            getDoc: function (mainDocument, components) {
                var dto = {
                    ID: mainDocument.ID,
                    FileName: mainDocument.FileName,
                    Components: components
                }

                var url = 'http://192.168.197.202/LegalAssistance/api/document/generate';

                return $http({ method: "POST", url: url, data: dto, responseType: 'arraybuffer' })
                    .then(function (response) {
                        var file = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8" });
                        var name = mainDocument.Name + '.docx';
                        saveAs(file, name);
                    });
            }
        };

        return factory;
    }
})();