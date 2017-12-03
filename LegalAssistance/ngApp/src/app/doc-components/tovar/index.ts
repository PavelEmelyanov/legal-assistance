import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { TovarComponent } from './tovar.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [    
        TovarComponent
    ],    
    exports: [
        TovarComponent
    ]
})
export class TovarModule {};