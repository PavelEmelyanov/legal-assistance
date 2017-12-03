import { Component, ViewChild } from '@angular/core';

import { PokupatelComponent }  from '../../doc-components/pokupatel/pokupatel.component';
import { OrganizaciyaComponent }  from '../../doc-components/organizaciya/organizaciya.component';
import { ZamenaTovaraComponent }  from '../../doc-components/zamena-tovara/zamena.tovara.component';
import { TovarComponent }  from '../../doc-components/tovar/tovar.component';
import { PenyaComponent }  from '../../doc-components/penya/penya.component';
import { TovarNaPeriodZameniComponent }  from '../../doc-components/tovar-na-period-zameni/tovar.na.period.zameni.component';
import { UbitkiComponent }  from '../../doc-components/ubitki/ubitki.component';
import { DataDocumentaComponent }  from '../../doc-components/data-documenta/data.documenta.component';

import { DocumentService } from '../../core/document.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',  
})
export class AppComponent {  
  @ViewChild(OrganizaciyaComponent)
  private organizaciya: OrganizaciyaComponent;

  @ViewChild(PokupatelComponent)
  private pokupatel: PokupatelComponent;

  @ViewChild(ZamenaTovaraComponent)
  private zamena: ZamenaTovaraComponent;

  @ViewChild(TovarComponent)
  private tovar: TovarComponent;

  @ViewChild(UbitkiComponent)
  private ubitki: UbitkiComponent;

  @ViewChild(PenyaComponent)
  private penya: PenyaComponent;

  @ViewChild(TovarNaPeriodZameniComponent)
  private tovarNaPeriodZameni: TovarNaPeriodZameniComponent;
  
  @ViewChild(DataDocumentaComponent)
  private dataDocumenta: DataDocumentaComponent;

  cenaTovara() { return 0; }

  constructor(private documentService: DocumentService) { }

  ngAfterViewInit() {    
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.cenaTovara = () => {
      return this.tovar ? this.tovar.cenaTovara.value : 0;
    }, 0);
  }

  save() {    
    this.documentService.generateDocument(
      this.penya,
      this.pokupatel,
      this.organizaciya,
      this.tovar,
      this.tovarNaPeriodZameni,
      this.zamena,
      this.ubitki,
      this.dataDocumenta);
  }
}
