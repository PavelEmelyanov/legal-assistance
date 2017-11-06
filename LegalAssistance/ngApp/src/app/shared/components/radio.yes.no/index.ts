import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RadioYesNoComponent } from './radio.yes.no.component'

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [    
        RadioYesNoComponent
    ],    
    exports: [
        RadioYesNoComponent
    ]
})
export class RadioYesNoModule {};