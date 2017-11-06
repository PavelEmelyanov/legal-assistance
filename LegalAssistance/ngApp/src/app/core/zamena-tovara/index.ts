import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule }   from '@angular/forms';

import { CheckBoxWithInputModule } from '../../shared/components/checkbox.with.input';
import { RadioYesNoModule } from '../../shared/components/radio.yes.no';
import { ZamenaTovaraComponent } from './zamena.tovara.component';


@NgModule({
    imports: [
        FormsModule,
        CheckBoxWithInputModule,
        RadioYesNoModule,
        CommonModule
    ],
    declarations: [    
        ZamenaTovaraComponent
    ],    
    exports: [
        ZamenaTovaraComponent
    ]
})
export class ZamenaTovaraModule {};