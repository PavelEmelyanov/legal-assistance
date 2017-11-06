import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NguiAutoCompleteModule  } from '@ngui/auto-complete';

import { InnAutocompleteComponent } from './inn.autocomplete.component';

@NgModule({
    imports: [
        FormsModule,
        NguiAutoCompleteModule
    ],
    declarations: [    
        InnAutocompleteComponent
    ],    
    exports: [
        InnAutocompleteComponent
    ]
})
export class InnAutocompleteModule {};