import DocComponent from './doc.component.model';
import DocDto from './doc.dto.model';
import Utils from '../utils';

export default class Checkbox extends DocComponent {    
    public flag: boolean;
    public yesText: string;
    public noText: string;

    public constructor(init?:Partial<Checkbox>) {        
        super(init);
        Object.assign(this, init);        
    }

    public toDocDto(): DocDto {
        let value = this.flag ? this.yesText : this.noText;

        return new DocDto({
            key: this.componentInFileKey,
            value: value || '',
            removeLineIfResultIsEmpty: this.removeLineIfResultIsEmpty
        });
    }
}