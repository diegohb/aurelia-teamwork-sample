import {TWPMService} from "../services/twpm-svc";
import {Person} from "../models/person"
import {PersonVM} from "./PersonVM";

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