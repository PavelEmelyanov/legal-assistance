(function () {
    'use strict';

    angular.module('LASite.documents.ZamenaTovaraNenadlezhashegoKachestva')
        .service('ZamenaTovaraNenadlezhashegoKachestvaConfig',
            ZamenaTovaraNenadlezhashegoKachestvaConfig);

    ZamenaTovaraNenadlezhashegoKachestvaConfig.$inject =
        ['ComponentTypes', 'DocToViewConfig', 'OrganizaciyaConfig', 'PenyaConfig',
        'PokupatelConfig', 'TovarConfig', 'TovarNaPeriodZameniConfig',
        'UbitkiConfig', 'ZamenaConfig'];

    function ZamenaTovaraNenadlezhashegoKachestvaConfig(
        componentTypes, docToViewConfig, organizaciyaConfig, penyaConfig,
        pokupatelConfig, tovarConfig, tovarNaPeriodZameniConfig,
        ubitkiConfig, zamenaConfig) {

        //File name is key
        var document = angular.extend(
            {
                docDate: {
                    componentType: componentTypes.input,
                    componentInFileKey: "doc-date",
                }
            },
            organizaciyaConfig.get(),
            penyaConfig.get(),
            pokupatelConfig.get(),
            tovarConfig.get(),
            tovarNaPeriodZameniConfig.get(),
            ubitkiConfig.get(),
            zamenaConfig.get());                            
        
        var sectionFolder = docToViewConfig.docFolder + '/ZamenaTovaraNenadlezhashegoKachestva/sections'

        var relatedData = {
            innTooltip: 'В случае продавца, ИНН и другую информацию можно найти на чеке. В случае изготовителя - на упаковке товара.',
            alertNaZamenuTechSlozhniy: 'Вы не можете потребовать аналогичный товар на период замены, т.к. некачественный заменяемый товар включен в перечень товаров, не подлежащих замене.',
            alertNaZamenuSvoistva: 'Вы не можете потребовать аналогичный товар на замену, который не обладает теми же свойствами, что и заменяемый.',
            drugoyTovarTooltip: 'У вас есть возможность заменить товар на любой другой, другого типа, с другими характеристиками и свойствами.',
            alertPyatnadcatDney: 'К сожалению вы не можете потребовать заменить товар, т.к. он является технически сложным, прошло 15 дней с момента получения и Ваш случай не подходит не под один из описанных выше',
            svoistvaTooltip: 'Потребительские свойства - проявляющиеся при использовании товара потребителем, свойства, в процессе удовлетворения потребностей. Это совокупность технических, экономических и эстетических качеств товара, обеспечивающих покупателю наибольшее удовлетворение его потребностей за оптимальную цену'
        }

        return {
            get: function () {
                return {
                    document: angular.copy(document),
                    
                    sections: {
                        zamena: sectionFolder + '/Zamena/Zamena.html',
                        organizaciya: sectionFolder + '/Organizaciya/Organizaciya.html',
                        pokupatel: sectionFolder + '/Pokupatel/Pokupatel.html',
                        tovar: sectionFolder + '/Tovar/Tovar.html',
                        tovarNaPeriodZameni: sectionFolder + '/TovarNaPeriodZameni/TovarNaPeriodZameni.html',
                        penya: sectionFolder + '/Penya/Penya.html',
                        ubitki: sectionFolder + '/Ubitki/Ubitki.html'
                    },

                    relatedData : relatedData
                }
            }
        };
    }
})();