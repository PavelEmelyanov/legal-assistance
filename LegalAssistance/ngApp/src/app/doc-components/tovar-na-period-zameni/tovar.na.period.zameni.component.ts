import { Component } from '@angular/core';
import { CustomInput, DocDto } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';

@Component({  
  selector: 'la-tovar-na-period-zameni',
  templateUrl: './tovar.na.period.zameni.component.html',  
})
export class TovarNaPeriodZameniComponent extends DocComponentBase {
  analogichniyTovarNaimenovanie: CustomInput;
  analogichniyTovarArticul: CustomInput;

  tovarNaZamenuModel = new TovarNaZamenuModel();  

  declareDocFields(): void {
    this.analogichniyTovarNaimenovanie = new CustomInput({     
      componentInFileKey: 'analog-tovar-naimenovanie',
      removeLineIfResultIsEmpty: true,
      getValue: () => {       
        if (this.tovarNaZamenuModel.mozhnoZamenitFlag) {
            return this.tovarNaZamenuModel.naimenovanie;
        } else {
            return null;
        }
      }
    });

    this.analogichniyTovarArticul = new CustomInput({      
      componentInFileKey: 'analog-tovar-articul',      
      getValue: () => {
        if (this.tovarNaZamenuModel.mozhnoZamenitFlag && this.tovarNaZamenuModel.articulFlag) {
            return `, Артикул ${this.tovarNaZamenuModel.articul}`;
        } else {
            return null;
        }
      }
    });
  }
}

class TovarNaZamenuModel {
  flag: boolean;
  naimenovanie: string;
  articulFlag: boolean;
  articul: string;
  zamenyamiyTovarFlag: boolean;
  obladaetSvoystvami: boolean;

  get mozhnoZamenitFlag() : boolean {
    let flag = this.flag 
      && this.zamenyamiyTovarFlag === false 
      && this.obladaetSvoystvami === true;
    
      return flag;
  }
}