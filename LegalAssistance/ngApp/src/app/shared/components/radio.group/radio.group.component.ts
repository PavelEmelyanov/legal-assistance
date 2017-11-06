import { Component, Input, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { RadioGroupOption } from '../../../shared/models/radio.group.model';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value.accessor.base';

@Component({  
  selector: 'la-radio-group',
  templateUrl: './radio.group.component.html',  
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true,
  }] 
})
export class RadioGroupComponent extends ValueAccessorBase<string> implements OnInit {       
  @Input() options: Array<RadioGroupOption>;  
  name: string;


  ngOnInit() {
    this.name = "radioGroup_" + (Math.random() * 1000).toFixed(1);
    this.value = this.options[0].value;    
  }
}