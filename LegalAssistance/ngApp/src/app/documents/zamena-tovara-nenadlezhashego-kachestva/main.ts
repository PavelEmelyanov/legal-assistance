import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { CoreModule } from '../../core';

import { AppComponent } from './app.component';

import { PokupatelModule }  from '../../doc-components/pokupatel';
import { OrganizaciyaModule }  from '../../doc-components/organizaciya';
import { ZamenaTovaraModule } from '../../doc-components/zamena-tovara';
import { TovarModule } from '../../doc-components/tovar';
import { PenyaModule } from '../../doc-components/penya';
import { TovarNaPeriodZameniModule } from '../../doc-components/tovar-na-period-zameni';
import { UbitkiModule } from '../../doc-components/ubitki';
import { DataDocumentaModule } from '../../doc-components/data-documenta';

@NgModule({
  imports: [
    BrowserModule,    
    CoreModule,    
    PokupatelModule,
    OrganizaciyaModule,
    ZamenaTovaraModule,
    TovarModule,
    PenyaModule,
    TovarNaPeriodZameniModule,
    UbitkiModule,
    DataDocumentaModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
