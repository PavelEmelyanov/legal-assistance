import { Component } from '@angular/core';
import { CustomInput, DocDto } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';

@Component({  
  selector: 'la-ubitki',
  templateUrl: './ubitki.component.html',  
})
export class UbitkiComponent extends DocComponentBase {
  vozmeshenieUbitkovProsba: CustomInput;
  vozmeshenieUbitkovSumma: CustomInput;

  flag: boolean;
  prosba: string;
  summa: number;

  declareDocFields(): void {
    this.vozmeshenieUbitkovProsba = new CustomInput({      
      componentInFileKey: 'vozmeshenie-ubitkov-prosba',
      removeLineIfResultIsEmpty: true,
      getValue: () => {        
          if (this.flag) {
              return this.prosba + '.';
          } else {
              return null;
          }      
      }
    });

    this.vozmeshenieUbitkovSumma = new CustomInput({      
      componentInFileKey: 'vozmeshenie-ubitkov-summa',
      removeLineIfResultIsEmpty: true,
      getValue: () => {        
        if (this.flag) {
          return Utils.toRub(this.summa);
        } else {
            return null;
        }      
      }
    });
  }
}