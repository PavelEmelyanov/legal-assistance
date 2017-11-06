import { Component, OnInit } from '@angular/core';
import { Input, DocDto, RadioGroup, RadioGroupOption } from '../../shared/models';
import { DocComponentBase } from '../doc.component.base';

@Component({  
  selector: 'la-organizaciya',
  templateUrl: './organizaciya.component.html',  
})
export class OrganizaciyaComponent extends DocComponentBase {
    komu: RadioGroup;
    inn: Input;
    ogrn: Input;
    nazvaniaOrganizaciya: Input;
    addressOrganizaciya: Input;    
    isNotFoundByAutocomplete = false;

    declareDocFields() {
        this.komu = new RadioGroup({      
            componentInFileKey: 'komu',
            options: [
                new RadioGroupOption({
                    description: 'Продавец', 
                    value: 'Продавец', 
                    hint: 'Тот, кто продаёт товар и выдаёт чек - магазин.'
                }),
                new RadioGroupOption({
                    description: 'Изготовитель', 
                    value: 'Изготовитель', 
                    hint: 'Тот, кто производит товар, например фабрика. В случае если невозможо обратится к продавцу (магазин закрылся, нету чека, не помните где купили), можно обратится к изготовителю.'
                }),
                new RadioGroupOption({
                    description: 'Уполномоченный индивидуальный предприниматель', 
                    value: 'Уполномоченный индивидуальный предприниматель'
                }),
                new RadioGroupOption({
                    description: 'Импортёр', 
                    value: 'Импортёр'
                }),
                new RadioGroupOption({
                    description: 'Уполномоченная организация', 
                    value: 'Уполномоченная организация'
                }),
            ]      
        });

        this.inn = new Input({      
            componentInFileKey: 'inn'
        });

        this.ogrn = new Input({      
            componentInFileKey: 'ogrn',      
            resultTextTemplate: "ОГРН: {0},",
            removeLineIfResultIsEmpty: true,
        });

        this.nazvaniaOrganizaciya = new Input({      
            componentInFileKey: 'nazvania-organizaciya'
        });

        this.addressOrganizaciya = new Input({      
            componentInFileKey: 'address-organizaciya'
        }); 
    }   

    onOrgSelect(orgInfo: any){
        this.inn.value = orgInfo['data']['inn'];
        this.ogrn.value = orgInfo['data']['ogrn'];
        this.nazvaniaOrganizaciya.value = orgInfo['value'];
        this.addressOrganizaciya.value = orgInfo['data']['address']['value'];
    }

    getResult(): Array<DocDto> {
        return [
            this.komu.toDto(),
            this.inn.toDto(), 
            this.ogrn.toDto(), 
            this.nazvaniaOrganizaciya.toDto(), 
            this.addressOrganizaciya.toDto()
        ];
    }
}