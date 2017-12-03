import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components'
import { SharedPipesModule } from './pipes'

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SharedComponentsModule,
        SharedPipesModule
    ],    
    exports: [
        FormsModule,
        CommonModule,
        SharedComponentsModule,
        SharedPipesModule
    ]
})
export class SharedModule {};