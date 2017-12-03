import { Injectable } from '@angular/core';
import { DocComponentBase } from '../doc-components/doc.component.base';
import { DocDto } from '../shared/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable()
export class DocumentService {
    constructor(private httpClient: HttpClient) { }
  
    generateDocument(... docComponents: DocComponentBase[]) {
        let components = new Array<DocDto>();

        docComponents.forEach(docComponent => {
            var dtoArray = docComponent.getResult();
            components = components.concat(dtoArray);
        });

        let docInfo = JSON.parse(document.getElementById('doc-data-json').innerText);

        let dto = {
            id: docInfo.ID,
            fileName: docInfo.FileName,
            components: components
        };

        var url = 'http://192.168.197.202/LegalAssistance/api/document/generate';        

        this.httpClient.post(url, dto, {responseType: 'arraybuffer'})
            .map(response => {                             
                var file = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8" });
                var name = docInfo.Name + '.docx';
                saveAs(file, name);
            })
            .subscribe();
        }
  }