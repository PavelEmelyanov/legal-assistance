import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PokupatelModule }  from '../../core/pokupatel';
import { OrganizaciyaModule }  from '../../core/organizaciya';
import { ZamenaTovaraModule } from '../../core/zamena-tovara'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    PokupatelModule,
    OrganizaciyaModule,
    ZamenaTovaraModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
