import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { UbitkiComponent } from './ubitki.component';

@NgModule({
    imports: [        
        SharedModule
    ],
    declarations: [    
        UbitkiComponent
    ],    
    exports: [
        UbitkiComponent
    ]
})
export class UbitkiModule {};