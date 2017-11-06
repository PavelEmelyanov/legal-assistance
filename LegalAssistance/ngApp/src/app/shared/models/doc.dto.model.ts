export default class DocDto {
    public key: string;
    public value: string;
    public removeLineIfResultIsEmpty: boolean;

    public constructor(init?:Partial<DocDto>) {
        Object.assign(this, init);
    }
}