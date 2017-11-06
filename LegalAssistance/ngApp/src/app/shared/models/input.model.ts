import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export default class Input extends DocComponent {    
    public value: string;
    public resultTextTemplate: string;

    public constructor(init?:Partial<Input>) {
        super(init);
        Object.assign(this, init);        
    }

    public toDto(): DocDto {
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