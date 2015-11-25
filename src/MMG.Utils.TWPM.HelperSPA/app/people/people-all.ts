import {TWPMService} from "../services/twpm-svc";
import {Person} from "../models/person"

export class PeopleVM {
    twpmService: TWPMService;
    people: Array<PersonVM> = [];

    constructor () {
        this.twpmService = new TWPMService();
    }

    get People (): Array<PersonVM> {
        return this.people;
    }

    activate () {
        return this.loadPeople();
    }

    loadPeople (): Promise<void> {
        return this.twpmService.fetchPeople().then(pPeople => {
            this.people = pPeople.map(pBasePerson => new PersonVM(pBasePerson, "https://mmgct.teamwork.com/people"));
        });
    }
}

export class PersonVM {
    personID: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    profileWebURL: string;

    constructor (pData: Person, pProfileWebURLBase: string) {
        this.personID = pData.personID;
        this.firstName = pData.firstName;
        this.lastName = pData.lastName;
        this.avatarUrl = pData.avatarUrl;
        this.profileWebURL = `${pProfileWebURLBase}/${this.personID}`;
    }


}