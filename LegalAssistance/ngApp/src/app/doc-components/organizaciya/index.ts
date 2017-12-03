import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { OrganizaciyaComponent } from './organizaciya.component';
import { InnAutocompleteModule } from './inn-autocomplete';

@NgModule({
    imports: [
        SharedModule,
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