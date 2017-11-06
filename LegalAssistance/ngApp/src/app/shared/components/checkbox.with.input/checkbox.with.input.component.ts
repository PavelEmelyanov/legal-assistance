import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value.accessor.base';

@Component({  
  selector: 'la-checkbox-with-input',
  templateUrl: './checkbox.with.input.component.html',  
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxWithInputComponent),
    multi: true,
  }] 
})
export class CheckBoxWithInputComponent extends ValueAccessorBase<string> {             
  @Input() placeholder: string;
  @Input() flag: boolean;
  @Output() flagChange = new EventEmitter<boolean>();
  
  text: string;

  onChange() {
    if (!this.flag){
      this.value = null;
    }

    this.flagChange.emit(this.flag);
  }
}