import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { OrganizaciyaComponent } from './organizaciya.component';
import { RadioGroupModule } from '../../shared/components/radio.group';
import { InnAutocompleteModule } from './inn-autocomplete';

@NgModule({
    imports: [
        FormsModule,
        RadioGroupModule,
        InnAutocompleteModule
    ],
    declarations: [    
        OrganizaciyaComponent
    ],    
    exports: [
        OrganizaciyaComponent
    ]
})
export class OrganizaciyaModule {};