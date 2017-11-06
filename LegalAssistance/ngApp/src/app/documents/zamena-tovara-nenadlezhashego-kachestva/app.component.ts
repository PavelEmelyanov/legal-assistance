import { Component, OnInit, ViewChild } from '@angular/core';
import { PokupatelComponent }  from '../../core/pokupatel/pokupatel.component';
import { OrganizaciyaComponent }  from '../../core/organizaciya/organizaciya.component';
import { ZamenaTovaraComponent }  from '../../core/zamena-tovara/zamena.tovara.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',  
})
export class AppComponent implements OnInit {  
  @ViewChild(OrganizaciyaComponent)
  private organizaciya: OrganizaciyaComponent;

  @ViewChild(PokupatelComponent)
  private pokupatel: PokupatelComponent;

  @ViewChild(ZamenaTovaraComponent)
  private zamena: ZamenaTovaraComponent;

  ngOnInit() {
    setTimeout(() => console.log(this.pokupatel.getResult(), this.organizaciya.getResult()), 100);
  }
  
  save() {
    console.log(this.pokupatel.getResult(), this.organizaciya.getResult(), this.zamena.getResult());
  }
}
