import { NgModule } from '@angular/core';
import { CheckBoxWithInputModule } from './checkbox.with.input';
import { RadioGroupModule } from './radio.group';
import { RadioYesNoModule } from './radio.yes.no';

@NgModule({
    imports: [
        CheckBoxWithInputModule,        
        RadioGroupModule,
        RadioYesNoModule
    ],    
    exports: [
        CheckBoxWithInputModule,
        RadioGroupModule,
        RadioYesNoModule
    ]
})
export class SharedComponentsModule {};