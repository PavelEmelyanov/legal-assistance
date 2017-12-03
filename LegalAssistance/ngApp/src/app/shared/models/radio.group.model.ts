import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export class RadioGroupOption {
    description: string;
    value: string;
    hint: string;

    public constructor(init?:Partial<RadioGroupOption>) {        
        Object.assign(this, init);   
    }
}

export class RadioGroup extends DocComponent {    
    public options: Array<RadioGroupOption>;
    public value: string;
    public resultTextTemplate: string;

    public constructor(init?:Partial<RadioGroup>) {
        super(init);
        Object.assign(this, init);        
    }

    public toDocDto(): DocDto {
        let value = this.value;

        if (this.resultTextTemplate){
            value = Utils.formatString(this.resultTextTemplate, this.value);
        }

        return new DocDto({
            key: this.componentInFileKey,
            value: value,
            removeLineIfResultIsEmpty: this.removeLineIfResultIsEmpty
        });
    }
}