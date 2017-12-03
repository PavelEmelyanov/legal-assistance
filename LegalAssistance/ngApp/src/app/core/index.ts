import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DocumentService } from './document.service'

@NgModule({    
    imports: [
        HttpClientModule
    ],    
    providers: [
        DocumentService
    ],
    exports: [
        HttpClientModule,        
    ]
})
export class CoreModule {};