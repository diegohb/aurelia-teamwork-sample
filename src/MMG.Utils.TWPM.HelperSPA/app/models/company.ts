export class Company {
    companyID: number;
    name: string;

    constructor (pData: any) {
        this.companyID = pData.id;
        this.name = pData.name;
    }
}