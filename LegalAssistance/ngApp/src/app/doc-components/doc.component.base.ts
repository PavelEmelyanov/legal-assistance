import { OnInit } from '@angular/core';
import { DocDto } from '../shared/models';

export abstract class DocComponentBase implements OnInit {       
  ngOnInit(){
    this.declareDocFields();
  }

  abstract declareDocFields(): void;
  
  public getResult(): Array<DocDto> {
    var result = new Array<DocDto>();
    
    //Iterate through class properties and get only doc input elements
    Object.keys(this).forEach((key) => {
      var value = this[key];

      if (typeof value == 'object' && 'toDocDto' in value && typeof value['toDocDto'] == 'function'){
        result.push(value.toDocDto());
      }
    })

    return result;
  }
}