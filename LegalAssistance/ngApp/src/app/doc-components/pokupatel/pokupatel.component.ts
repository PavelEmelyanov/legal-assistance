import { Component } from '@angular/core';
import { Input, DocDto } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';

@Component({  
  selector: 'la-pokupatel',
  templateUrl: './pokupatel.component.html',  
})
export class PokupatelComponent extends DocComponentBase {
  pokupatel: Input;
  addressPokupatel: Input;

  declareDocFields(): void {
    this.pokupatel = new Input({      
      componentInFileKey: 'pokupatel'
    });

    this.addressPokupatel = new Input({      
        componentInFileKey: 'address-pokupatel'
    });
  }
}