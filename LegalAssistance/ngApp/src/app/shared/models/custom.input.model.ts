import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export default class CustomInput extends DocComponent {           
    public getValue: () => string;

    public constructor(init?:Partial<CustomInput>) {
        super(init);
        Object.assign(this, init);        
    }

    public toDto(): DocDto {       
        return new DocDto({
            key: this.componentInFileKey,
            value: this.getValue(),
            removeLineIfResultIsEmpty: this.removeLineIfResultIsEmpty
        });
    }
}