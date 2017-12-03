import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DataDocumentaComponent } from './data.documenta.component';

@NgModule({
    imports: [        
        SharedModule
    ],
    declarations: [    
        DataDocumentaComponent
    ],    
    exports: [
        DataDocumentaComponent
    ]
})
export class DataDocumentaModule {};