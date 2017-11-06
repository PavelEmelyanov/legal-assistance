import DocDto from './doc.dto.model';

export default abstract class DocComponent {    
    public componentInFileKey: string;
    public removeLineIfResultIsEmpty: boolean;    

    public constructor(init?:Partial<DocComponent>) {
        this.removeLineIfResultIsEmpty = false;
        Object.assign(this, init);
    }

    public abstract toDto(): DocDto;
}