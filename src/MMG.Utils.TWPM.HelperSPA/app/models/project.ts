import {Company} from "company";

export class Project {
    ID: number;
    name: string;
    lastModified: any;
    dateCreated: any;
    endDate: any;
    company: Company;

    constructor (pData: any) {
        this.ID = pData.ID;
        this.name = name;
        this.lastModified = pData["last-changed-on"];
        this.dateCreated = pData["created-on"];
        this.endDate = pData.endDate;
        if (pData.company) {
            this.company = new Company(pData.company);
        }
    }
}