(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .controller('ZamenaTovaraNenadlezhashegoKachestvaController',
            ZamenaTovaraNenadlezhashegoKachestvaController);

    ZamenaTovaraNenadlezhashegoKachestvaController.$inject =
        ['$scope', 'ZamenaTovaraNenadlezhashegoKachestvaConfig',
        'DocumentService'];

    function ZamenaTovaraNenadlezhashegoKachestvaController($scope, zamenaTovaraNenadlezhashegoKachestvaConfig,
            documentService) {

        $scope.getDoc = function () {
            var mainDocument = $scope.$parent.MainDocument;
            var config = zamenaTovaraNenadlezhashegoKachestvaConfig.get().document;
            var document = $scope.document;

            var params = documentService.getDocParams(document, config, function (key, customComponent) {

                switch (key) {
                    case 'specSroki':
                        return customComponent.parseFunction(
                            document.garantSrok.value,
                            document.srokGodnosti.value,
                            document.srokSluzhbi.value);
                    case 'obmenTovaraModel':
                        return customComponent.parseFunction(
                            document.obmenTovara.drugoyTovarFlag,
                            document.obmenTovara.drugoyModel,
                            document.obmenTovara.drugoyArticul);
                    case 'obrashenieRaneeDate':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.flag,
                            document.biloObrashenieRanee.date);
                    case 'obrashenieRaneeUstanovleno':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.proverkaKachestva,
                            document.biloObrashenieRanee.otsutstvieTovaraNaZamenu,
                            document.biloObrashenieRanee.dostavkaSever);
                    case 'obrashenieRaneeNeustoyka':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.trebovatNeustoyku,
                            document.biloObrashenieRanee.neustoyka);
                    case 'obrashenieRaneeNeustoykaFormula':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.formula);
                    case 'obrashenieRaneeAnalogichniyTovarDate':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.zamenaAnalogichnogoTovaraFlag,
                            document.biloObrashenieRanee.analogichniyTovarDate);
                    case 'obrashenieRaneeAnalogichniyTovarNeustoyka':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.analogichniyTovarTrebovatNeustoyku,
                            document.biloObrashenieRanee.analogichniyTovarNeustoyka);
                    case 'obrashenieRaneeAnalogichniyTovarNeustoykaFormula':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.analogichniyTovarFormula);
                    case 'stat21':
                        return customComponent.parseFunction(
                            document.biloObrashenieRanee.trebovatNeustoyku);
                    case 'analogichniyTovarNaimenovanie':
                        return customComponent.parseFunction(
                            document.hochuAnalogichniyTovar.flag && document.hochuAnalogichniyTovar.zamenyamiyTovarFlag === false && document.hochuAnalogichniyTovar.obladaetSvoystvami === false,
                            document.hochuAnalogichniyTovar.naimenovanieTovara);
                    case 'analogichniyTovarArticul':
                        return customComponent.parseFunction(
                            document.hochuAnalogichniyTovar.flag && document.hochuAnalogichniyTovar.zamenyamiyTovarFlag === false && document.hochuAnalogichniyTovar.obladaetSvoystvami === true,
                            document.hochuAnalogichniyTovar.articulIsSelected,
                            document.hochuAnalogichniyTovar.articul);
                    case 'vozmeshenieUbitkovProsba':
                        return customComponent.parseFunction(
                            document.vozmeshenieUbitkov.flag,
                            document.vozmeshenieUbitkov.prosba);
                    case 'vozmeshenieUbitkovSumma':
                        return customComponent.parseFunction(
                            document.vozmeshenieUbitkov.flag,
                            document.vozmeshenieUbitkov.summa);
                    default:
                        throw new Error("Compomnent with {0} key is not implemented".format(key));
                        break;
                }
            });

            documentService.getDoc(mainDocument, params);
        }

        var init = function () {
            var config = zamenaTovaraNenadlezhashegoKachestvaConfig.get();

            $scope.sections = config.sections;
            $scope.document = config.document;
            $scope.relatedData = config.relatedData;

            $scope.document.komu.value = $scope.document.komu.options[0].value;
            $scope.document.imeetsyaLiDokument.value = true;

            angular.extend($scope.document, {
                garantSrok: {},
                srokGodnosti: {},
                srokSluzhbi: {},
                obmenTovara: {
                    drugoyTovarFlag: false,                    
                },
                biloObrashenieRanee: {
                    flag: false
                },
                vozmeshenieUbitkov: {
                    flag: false
                },
                techSlozhniyTovar: {
                    flag: false,
                    pyatnadcatDney: false
                },
                hochuAnalogichniyTovar: {
                    flag: false
                },
                docDate: {
                    value: new Date()
                }
            });

            //Подсчитать пеню, если обращение было ранее
            $scope.$watch('[document.biloObrashenieRanee.flag, document.biloObrashenieRanee.date, document.biloObrashenieRanee.dostavkaSever, document.biloObrashenieRanee.proverkaKachestva, document.biloObrashenieRanee.otsutstvieTovaraNaZamenu, document.cenaTovara.value]',
                function (newVal) {
                    var cenaTovara = $scope.document.cenaTovara.value;

                    if (!newVal
                        || !newVal[0]
                        || !angular.utils.isNotNullOrEmpty(newVal[1])
                        || newVal[2]
                        || !(cenaTovara > 0)) {

                        angular.extend($scope.document.biloObrashenieRanee, {
                            trebovatNeustoyku: false,
                            neustoyka: null,
                            formula: null
                        });

                    } else {
                        var period = angular.utils.getDatePeriod(newVal[1], new Date());
                        var delta = 7;

                        if (newVal[3]) {
                            delta = 14;
                        }

                        if (newVal[4]) {
                            delta = 30;
                        }

                        var neustoyka = Math.round((period.days - delta) * 0.01 * cenaTovara);

                        if (neustoyka > 0) {
                            angular.extend($scope.document.biloObrashenieRanee, {
                                trebovatNeustoyku: true,
                                neustoyka: neustoyka,
                                formula: '({0} - {1} - {2} дней) * 1% * {3}'
                                    .format(angular.utils.toDate(new Date()), angular.utils.toDate(newVal[1]), delta, cenaTovara)
                            });
                        }
                        else {
                            angular.extend($scope.document.biloObrashenieRanee, {
                                trebovatNeustoyku: false,
                                neustoyka: null,
                                formula: null
                            });
                        }
                    }

                }, true)

            //Подсчитать пеню, если было требование на предоставление аналогичного товара
            $scope.$watch('[document.biloObrashenieRanee.zamenaAnalogichnogoTovaraFlag, document.biloObrashenieRanee.analogichniyTovarDate, document.cenaTovara.value]',
                function (newVal) {
                    var cenaTovara = $scope.document.cenaTovara.value;

                    if (!newVal
                        || !newVal[0]
                        || !angular.utils.isNotNullOrEmpty(newVal[1])
                        || !(cenaTovara > 0)) {

                        angular.extend($scope.document.biloObrashenieRanee, {
                            analogichniyTovarTrebovatNeustoyku: false,
                            analogichniyTovarNeustoyka: null,
                            analogichniyTovarFormula: null
                        });

                    } else {
                        var period = angular.utils.getDatePeriod(newVal[1], new Date());
                        var delta = 3;

                        var neustoyka = Math.round((period.days - delta) * 0.01 * cenaTovara);

                        if (neustoyka > 0) {
                            angular.extend($scope.document.biloObrashenieRanee, {
                                analogichniyTovarTrebovatNeustoyku: true,
                                analogichniyTovarNeustoyka: neustoyka,
                                analogichniyTovarFormula: '({0} - {1} - {2} дней) * 1% * {3}'
                                    .format(angular.utils.toDate(new Date()), angular.utils.toDate(newVal[1]), delta, cenaTovara)
                            });
                        }
                        else {
                            angular.extend($scope.document.biloObrashenieRanee, {
                                analogichniyTovarTrebovatNeustoyku: false,
                                analogichniyTovarNeustoyka: null,
                                analogichniyTovarFormula: null
                            });
                        }
                    }

                }, true)
        }

        init();
    }
})();