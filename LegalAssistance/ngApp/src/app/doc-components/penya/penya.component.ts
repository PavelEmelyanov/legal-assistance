import { Component, Input } from '@angular/core';
import { DocDto, CustomInput } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';
import Utils from '../../shared/utils';

@Component({  
  selector: 'la-penya',
  templateUrl: './penya.component.html',  
})
export class PenyaComponent extends DocComponentBase {
  @Input() cenaTovara: number;

  obrashenieRaneeDate: CustomInput;
  obrashenieRaneeUstanovleno: CustomInput;
  obrashenieRaneeNeustoyka: CustomInput;
  obrashenieRaneeNeustoykaFormula: CustomInput;
  obrashenieRaneeAnalogichniyTovarDate: CustomInput;
  obrashenieRaneeAnalogichniyTovarNeustoyka: CustomInput;
  obrashenieRaneeAnalogichniyTovarNeustoykaFormula: CustomInput;
  stat21: CustomInput;

  penyaModel = new PenyaModel();

  declareDocFields(): void {
    this.obrashenieRaneeDate = new CustomInput({
        removeLineIfResultIsEmpty: true,
        componentInFileKey: "obrashenie-ranee-data",
        getValue: () => {
            if (this.penyaModel.date) {
                return Utils.toDate(this.penyaModel.date);
            } else {
                return null;
            }
        }
    });
    
    this.obrashenieRaneeUstanovleno= new CustomInput({
        componentInFileKey: "obrashenie-ranee-ustanovleno",
        getValue: () => {
            if (this.penyaModel.proverkaKachestva) {
                return "Была установлена необходимость проверки качества.";
            }

            if (this.penyaModel.otsutstvieTovaraNaZamenu) {
                return 'Было установлено отсутствие товара для замены.';
            }

            if (this.penyaModel.dostavkaSever) {
                return "Товар необходимо доставить в район Крайнего Севера и приравненную к нему местность";
            }

            return null;
        }
    });

    this.obrashenieRaneeNeustoyka = new CustomInput({      
        removeLineIfResultIsEmpty: true,
        componentInFileKey: "obrashenie-ranee-neustoyka",
        getValue: () => {
            if (this.penyaModel.flag) {
                return Utils.toRub(this.penyaModel.neustoyka);
            } else {
                return null;
            }
        }
    });

    this.obrashenieRaneeNeustoykaFormula = new CustomInput({      
        componentInFileKey: 'obrashenie-ranee-neustoyka-formula',
        getValue: () => {
            return this.penyaModel.formula;
        }
    });

    this.obrashenieRaneeAnalogichniyTovarDate = new CustomInput({      
        removeLineIfResultIsEmpty: true,
        componentInFileKey: "obrashenie-ranee-analog-tovar-data",
        getValue: () => {
            if (this.penyaModel.zamenaAnalogichnogoTovaraFlag) {
                return Utils.toDate(this.penyaModel.analogichniyTovarDate);
            } else {
                return null;
            }
        }
    });

    this.obrashenieRaneeAnalogichniyTovarNeustoyka = new CustomInput({      
        removeLineIfResultIsEmpty: true,
        componentInFileKey: "obrashenie-ranee-analog-tovar-neustoyka",
        getValue: () => {
            if (this.penyaModel.zamenaAnalogichnogoTovaraFlag) {
                return Utils.toRub(this.penyaModel.analogichniyTovarNeustoyka);
            } else {
                return null;
            }
        }
    });

    this.obrashenieRaneeAnalogichniyTovarNeustoykaFormula = new CustomInput({      
        componentInFileKey: 'obrashenie-ranee-analog-tovar-neustoyka-formula',
        getValue: () => {
            return this.penyaModel.analogichniyTovarFormula;
        }
    });

    this.stat21 = new CustomInput({
        componentInFileKey: "stat-21",
        getValue: () => {
            if (this.penyaModel.trebovatNeustoyku) {
                return "21,";
            } else {
                return null;
            }
        }
    });
  }  

  //Подсчитать пеню, если обращение было ранее
  calculateNeustoyka() {   
    if (!this.penyaModel.flag        
        || !Utils.isNotNullOrEmpty(this.penyaModel.date)
        || this.penyaModel.dostavkaSever
        || !(this.cenaTovara > 0)) {

        this.penyaModel.trebovatNeustoyku = false;
        this.penyaModel.neustoyka = null;
        this.penyaModel.formula = null;
    } else {
        var period = Utils.getDatePeriod(this.penyaModel.date, new Date());
        var delta = 7;

        if (this.penyaModel.proverkaKachestva) {
            delta = 14;
        }

        if (this.penyaModel.otsutstvieTovaraNaZamenu) {
            delta = 30;
        }

        var neustoyka = Math.round((period.days - delta) * 0.01 * this.cenaTovara);

        if (neustoyka > 0) {
            this.penyaModel.trebovatNeustoyku = true;
            this.penyaModel.neustoyka = neustoyka;
            this.penyaModel.formula = `
                (${Utils.toDate(new Date())} 
                - ${Utils.toDate(this.penyaModel.date)} 
                - ${delta} дней) * 1% * ${this.cenaTovara}`;                   
        }
        else {
          this.penyaModel.trebovatNeustoyku = false;
          this.penyaModel.neustoyka = null;
          this.penyaModel.formula = null;
        }
    }
  }

  //Подсчитать пеню, если было требование на предоставление аналогичного товара
  //$scope.$watch('[document.biloObrashenieRanee.zamenaAnalogichnogoTovaraFlag, document.biloObrashenieRanee.analogichniyTovarDate, document.cenaTovara.value]',
  calculateNeustoykaAnalogichniyTovar() {     
      if (!this.penyaModel.zamenaAnalogichnogoTovaraFlag
          || !Utils.isNotNullOrEmpty(this.penyaModel.analogichniyTovarDate)
          || !(this.cenaTovara > 0)) {
              
            this.penyaModel.analogichniyTovarFormula = null;
            this.penyaModel.analogichniyTovarNeustoyka = null;
            this.penyaModel.analogichniyTovarTrebovatNeustoyku = null;         
      } else {
          var period = Utils.getDatePeriod(this.penyaModel.analogichniyTovarDate, new Date());
          var delta = 3;

          var neustoyka = Math.round((period.days - delta) * 0.01 * this.cenaTovara);

          if (neustoyka > 0) {
            this.penyaModel.analogichniyTovarFormula = `(${Utils.toDate(new Date())} 
            - ${Utils.toDate(this.penyaModel.analogichniyTovarDate)} 
            - ${delta} дней) * 1% * ${this.cenaTovara}`;

            this.penyaModel.analogichniyTovarNeustoyka = neustoyka;
            this.penyaModel.analogichniyTovarTrebovatNeustoyku = true;
          }
          else {
            this.penyaModel.analogichniyTovarFormula = null;
            this.penyaModel.analogichniyTovarNeustoyka = null;
            this.penyaModel.analogichniyTovarTrebovatNeustoyku = false;
          }
      }
  }
}

class PenyaModel {
  flag: boolean;
  zamenaAnalogichnogoTovaraFlag: boolean;
  date: Date;
  proverkaKachestva: boolean;
  otsutstvieTovaraNaZamenu: boolean;
  dostavkaSever: boolean;
  neustoyka: number;
  trebovatNeustoyku: boolean;
  analogichniyTovarDate: Date;
  analogichniyTovarNeustoyka: number;
  analogichniyTovarTrebovatNeustoyku: boolean;
  formula: string;
  analogichniyTovarFormula: string;
}