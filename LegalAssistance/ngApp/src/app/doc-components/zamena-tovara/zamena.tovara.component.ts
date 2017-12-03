import { Component, Output, EventEmitter } from '@angular/core';
import { DocDto, CustomInput } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';

@Component({  
  selector: 'la-zamena-tovara',
  templateUrl: './zamena.tovara.component.html',  
})
export class ZamenaTovaraComponent extends DocComponentBase {
  @Output() cannotProceed = new EventEmitter<boolean>();

  obmenTovara: CustomInput;  
  drugoyTovarFlag: boolean;
  drugoyModel: string;
  drugoyArticul: string;

  techSlozhniyTovar = {
    flag: false,
    sluchay: 0
  };

  declareDocFields(): void {
    this.drugoyTovarFlag = false;

    this.obmenTovara = new CustomInput({      
      componentInFileKey: "obmen-tovara-model",
      getValue: () => {
          if (this.drugoyTovarFlag) {            
              if (Utils.isNotNullOrEmpty(this.drugoyArticul)) {
                  return `товар другой марки - ${this.drugoyModel}, артикул ${this.drugoyArticul}`;
              } else {
                  return `товар другой марки - ${this.drugoyModel}`;
              }
          } else {
              return 'такой же товар';
          }
      }
    });
  }

  ngDoCheck() {
    this.checkCannotProceedRadioChange();
  }

  private checkCannotProceedRadioChange() {
    var result = this.techSlozhniyTovar.sluchay == 4;    
    this.cannotProceed.emit(result);
  }
}