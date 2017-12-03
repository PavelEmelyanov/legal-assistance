import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export default class CheckboxWithInput extends DocComponent {           
    public value: string;
    public flag: string;
    public resultTextTemplate: string;

    public constructor(init?:Partial<CheckboxWithInput>) {
        super(init);
        Object.assign(this, init);        
    }

    public toDocDto(): DocDto {              
        return new DocDto({
            key: this.componentInFileKey,
            value: this.getValue(),
            removeLineIfResultIsEmpty: this.removeLineIfResultIsEmpty
        });
    }

    private getValue(): string {
        if (!this.flag){
            let value = this.value;
            
            if (this.resultTextTemplate){
                value = Utils.formatString(this.resultTextTemplate, this.value);
            }

            return value;
        }
        else{
            return null;
        }
    }
}