import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { TovarNaPeriodZameniComponent } from './tovar.na.period.zameni.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [    
        TovarNaPeriodZameniComponent
    ],    
    exports: [
        TovarNaPeriodZameniComponent
    ]
})
export class TovarNaPeriodZameniModule {};