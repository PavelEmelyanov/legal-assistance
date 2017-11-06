import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { PokupatelComponent } from './pokupatel.component';


@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [    
        PokupatelComponent
    ],    
    exports: [
        PokupatelComponent
    ]
})
export class PokupatelModule {};