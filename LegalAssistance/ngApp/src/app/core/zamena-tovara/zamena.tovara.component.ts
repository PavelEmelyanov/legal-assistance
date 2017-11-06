import { Component } from '@angular/core';
import { DocDto, CustomInput } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';

@Component({  
  selector: 'la-zamena-tovara',
  templateUrl: './zamena.tovara.component.html',  
})
export class ZamenaTovaraComponent extends DocComponentBase {
  obmenTovara: CustomInput;  
  drugoyTovarFlag: boolean;
  drugoyModel: string;
  drugoyArticul: string;

  techSlozhniyTovar = {
    flag: false
  };

  declareDocFields(): void {
    this.drugoyTovarFlag = false;

    this.obmenTovara = new CustomInput({      
      componentInFileKey: "obmen-tovara-model",
      getValue: () => {
          if (this.drugoyTovarFlag) {            
              if (Utils.isNotNullOrEmpty(this.drugoyArticul)) {
                  return Utils.formatString('товар другой марки - {0}, артикул {1}', this.drugoyModel, this.drugoyArticul);
              } else {
                  return Utils.formatString('товар другой марки - {0}', this.drugoyModel);
              }
          } else {
              return 'такой же товар';
          }
      }
    });
  }

  getResult(): Array<DocDto> {
    return [this.obmenTovara.toDto()];
  }
}