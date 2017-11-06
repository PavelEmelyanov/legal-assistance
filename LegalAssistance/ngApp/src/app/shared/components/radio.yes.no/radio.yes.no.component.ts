import { Component, Input, forwardRef } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value.accessor.base';

@Component({  
  selector: 'la-radio-yes-no',
  templateUrl: './radio.yes.no.component.html', 
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioYesNoComponent),
    multi: true,
  }] 
})
export class RadioYesNoComponent extends ValueAccessorBase<boolean> {         
  @Input() yesText: string;
  @Input() noText: string;

  name = "radioYesNo_" + (Math.random() * 1000).toFixed(1);
}