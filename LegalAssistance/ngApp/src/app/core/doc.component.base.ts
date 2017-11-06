import { OnInit } from '@angular/core';
import { DocDto } from '../shared/models';

export abstract class DocComponentBase implements OnInit {       
  ngOnInit(){
    this.declareDocFields();
  }

  abstract declareDocFields(): void;
  abstract getResult(): Array<DocDto>;
}