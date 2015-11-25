import {Person} from "../models/person";

export class PersonVM {
    personID: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    profileWebURL: string;
    title: string;
    hasTitle: boolean;

    constructor (pData: Person, pProfileWebURLBase: string) {
        this.personID = pData.personID;
        this.firstName = pData.firstName;
        this.lastName = pData.lastName;
        this.avatarUrl = pData.avatarUrl;
        this.profileWebURL = `${pProfileWebURLBase}/${this.personID}`;
        this.hasTitle = pData.title && pData.title.length > 0;
        if (this.hasTitle)
            this.title = pData.title;
    }
}