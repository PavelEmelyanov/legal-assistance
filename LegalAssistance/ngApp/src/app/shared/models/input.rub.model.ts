import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export default class InputRub extends DocComponent {    
    public value: number;
    public resultTextTemplate: string;

    public constructor(init?:Partial<InputRub>) {
        super(init);
        Object.assign(this, init);        
    }

    public toDocDto(): DocDto {
        let value = Utils.toRub(this.value);

        if (this.resultTextTemplate){
            value = Utils.formatString(this.resultTextTemplate, value);
        }

        return new DocDto({
            key: this.componentInFileKey,
            value: value,
            removeLineIfResultIsEmpty: this.removeLineIfResultIsEmpty
        });
    }
}