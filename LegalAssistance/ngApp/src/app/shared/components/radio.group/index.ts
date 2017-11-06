import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RadioGroupComponent } from './radio.group.component'


@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [    
        RadioGroupComponent
    ],    
    exports: [
        RadioGroupComponent
    ]
})
export class RadioGroupModule {};