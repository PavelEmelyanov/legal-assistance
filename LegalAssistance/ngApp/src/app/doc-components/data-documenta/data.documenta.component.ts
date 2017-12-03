import { Component, ViewChild, ElementRef } from '@angular/core';
import { Input, DocDto } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';

declare var $:JQueryStatic;
import 'bootstrap-datepicker';

@Component({  
  selector: 'la-data-documenta',
  templateUrl: './data.documenta.component.html',  
})
export class DataDocumentaComponent extends DocComponentBase {
  docDate: Input;

  @ViewChild('#id') el:ElementRef;

  declareDocFields(): void {
    this.docDate = new Input({      
      componentInFileKey: 'doc-date',     
    });

    $("#date").datepicker();
  }    
}