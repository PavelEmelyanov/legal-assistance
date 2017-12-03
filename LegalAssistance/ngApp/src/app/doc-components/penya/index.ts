import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { PenyaComponent } from './penya.component';

@NgModule({
    imports: [
        SharedModule      
    ],
    declarations: [    
        PenyaComponent,        
    ],    
    exports: [
        PenyaComponent
    ]
})
export class PenyaModule {};