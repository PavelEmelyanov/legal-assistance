import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ZamenaTovaraComponent } from './zamena.tovara.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [    
        ZamenaTovaraComponent
    ],    
    exports: [
        ZamenaTovaraComponent
    ]
})
export class ZamenaTovaraModule {};