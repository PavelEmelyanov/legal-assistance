(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('PenyaConfig', PenyaConfig);

    PenyaConfig.$inject =
        ['ComponentTypes'];

    function PenyaConfig(componentTypes) {

        //File name is key
        var components = {
            obrashenieRaneeDate: {
                componentType: componentTypes.custom,
                removeLineIfResultIsEmpty: true,
                componentInFileKey: "obrashenie-ranee-data",
                parseFunction: function (flag, date) {
                    if (flag) {
                        return angular.utils.toDate(date);
                    } else {
                        return null;
                    }
                }
            },
            obrashenieRaneeUstanovleno: {
                componentType: componentTypes.custom,
                componentInFileKey: "obrashenie-ranee-ustanovleno",
                parseFunction: function (proverkaKachestva, otsutstvieTovaraNaZamenu, dostavkaSever) {
                    if (proverkaKachestva) {
                        return "Была установлена необходимость проверки качества.";
                    }

                    if (otsutstvieTovaraNaZamenu) {
                        return 'Было установлено отсутствие товара для замены.';
                    }

                    if (dostavkaSever) {
                        return "Товар необходимо доставить в район Крайнего Севера и приравненную к нему местность";
                    }

                    return null;
                }
            },
            obrashenieRaneeNeustoyka: {
                componentType: componentTypes.custom,
                removeLineIfResultIsEmpty: true,
                componentInFileKey: "obrashenie-ranee-neustoyka",
                parseFunction: function (flag, neustoyka) {
                    if (flag) {
                        return angular.utils.toRub(neustoyka);
                    } else {
                        return null;
                    }
                }
            },
            obrashenieRaneeNeustoykaFormula: {
                componentType: componentTypes.custom,
                componentInFileKey: 'obrashenie-ranee-neustoyka-formula',
                parseFunction: function (formula) {
                    return formula;
                }
            },
            obrashenieRaneeAnalogichniyTovarDate: {
                componentType: componentTypes.custom,
                removeLineIfResultIsEmpty: true,
                componentInFileKey: "obrashenie-ranee-analog-tovar-data",
                parseFunction: function (flag, date) {
                    if (flag) {
                        return angular.utils.toDate(date);
                    } else {
                        return null;
                    }
                }
            },
            obrashenieRaneeAnalogichniyTovarNeustoyka: {
                componentType: componentTypes.custom,
                removeLineIfResultIsEmpty: true,
                componentInFileKey: "obrashenie-ranee-analog-tovar-neustoyka",
                parseFunction: function (flag, neustoyka) {
                    if (flag) {
                        return angular.utils.toRub(neustoyka);
                    } else {
                        return null;
                    }
                }
            },
            obrashenieRaneeAnalogichniyTovarNeustoykaFormula: {
                componentType: componentTypes.custom,
                componentInFileKey: 'obrashenie-ranee-analog-tovar-neustoyka-formula',
                parseFunction: function (formula) {
                    return formula;
                }
            },
            stat21: {
                componentType: componentTypes.custom,
                componentInFileKey: "stat-21",
                parseFunction: function (neustoykaFlag) {
                    if (neustoykaFlag) {
                        return "21,";
                    } else {
                        return null;
                    }
                }
            },
        }

        return {
            get: function () {
                return components;
            }
        };
    }
})();