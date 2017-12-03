import { Component } from '@angular/core';
import { Input, DocDto, CheckboxWithInput, InputRubModel, Checkbox, CustomInput } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';
import SpecSrokiInfo from './spec.sroki.info';

@Component({  
  selector: 'la-tovar',
  templateUrl: './tovar.component.html',  
})
export class TovarComponent extends DocComponentBase {
  dataPokupki: Input;
  mestoPokupki: Input;
  naimenovanieTovara: Input;
  articul: CheckboxWithInput;
  cenaTovara: InputRubModel;
  imeetsyaLiDokument: Checkbox;
  sutPretenzii: Input;
  specSroki: CustomInput;
  specSrokiInfo = new SpecSrokiInfo();
  tovarNeOdnovremenno: Checkbox;

  declareDocFields(): void {
    this.dataPokupki = new Input({      
      componentInFileKey: 'data-pokupki'
    });

    this.mestoPokupki = new Input({      
        componentInFileKey: 'mesto-pokupki'
    });

    this.naimenovanieTovara = new Input({
      componentInFileKey: 'naimenovanie-tovara'
    });

    this.articul = new CheckboxWithInput({      
      componentInFileKey: 'articul'
    });

    this.cenaTovara = new InputRubModel({      
        componentInFileKey: 'cena-tovara'
    });

    this.imeetsyaLiDokument = new Checkbox({      
        componentInFileKey: 'imeetsya-li-dokument',
        yesText: "Документ, подтверждающий факт покупки, имеется",
    });

    this.sutPretenzii = new Input({      
        componentInFileKey: 'sut-pretenzii'
    });

    this.specSroki = new CustomInput({
        componentInFileKey: "spec-sroki",
        removeLineIfResultIsEmpty: true,
        getValue: () => {
          var garantString = Utils.isNotNullOrEmpty(this.specSrokiInfo.garantSrok)
            ? `гарантийный срок ${this.specSrokiInfo.garantSrok} месяцев`
            : null;

          var srokGodnostiString = Utils.isNotNullOrEmpty(this.specSrokiInfo.srokGodnosti)
              ? `срок годности ${this.specSrokiInfo.srokGodnosti} месяцев`
              : null;

          var srokSluzhbiString = Utils.isNotNullOrEmpty(this.specSrokiInfo.srokSluzhbi)
              ? `срок cлужбы ${this.specSrokiInfo.srokSluzhbi} месяцев`
              : null;

          return Utils.buildSentence(garantString, srokGodnostiString, srokSluzhbiString);
        }
    })

    this.tovarNeOdnovremenno = new Checkbox ({      
      componentInFileKey: "tovar-ne-odnovremenno",
      noText: 'В случае необходимости предоставить товар, прошу Вас уведомить меня о дате и месте передачи',
      removeLineIfResultIsEmpty: true,
    })
  }
}