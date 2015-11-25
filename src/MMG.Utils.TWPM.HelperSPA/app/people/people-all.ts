import {TWPMService} from "../services/twpm-svc";
import {Person} from "../models/person"

export class PeopleVM {
    twpmService: TWPMService;
    people: Array<Person> = [];

    constructor () {
        this.twpmService = new TWPMService();
    }

    get People (): Array<Person> {
        return this.people;
    }

    activate () {
        return this.loadPeople();
    }

    loadPeople (): Promise<void> {
        return this.twpmService.fetchPeople().then(pPeople => {
            this.people = pPeople;
        });
    }
}