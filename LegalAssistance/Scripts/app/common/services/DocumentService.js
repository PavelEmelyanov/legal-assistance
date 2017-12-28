(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("DocumentService", DocumentService);

    DocumentService.$inject = ['$http', 'ComponentsToDtoService'];

    function DocumentService($http, componentsToDtoService) {

        var factory = {            
            getDoc: function (mainDocument) {
                var dto = {
                    ID: mainDocument.ID,
                    FileName: mainDocument.FileName,
                    Components: componentsToDtoService.getDocParams()
                }

                var url = '{0}{1}{2}'.format(
                    location.origin,
                    document.getElementsByTagName('base')[0].getAttribute('href'),
                    'api/document/generate');

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