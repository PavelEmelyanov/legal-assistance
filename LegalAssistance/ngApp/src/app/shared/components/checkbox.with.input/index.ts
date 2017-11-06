import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CheckBoxWithInputComponent } from './checkbox.with.input.component'

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [    
        CheckBoxWithInputComponent
    ],    
    exports: [
        CheckBoxWithInputComponent
    ]
})
export class CheckBoxWithInputModule {};