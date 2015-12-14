export class Company {
    ID: number;
    name: string;

    constructor (pData: any) {
        this.ID = pData.id;
        this.name = pData.name;
    }
}