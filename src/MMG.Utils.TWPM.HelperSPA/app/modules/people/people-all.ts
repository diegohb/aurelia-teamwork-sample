import {autoinject} from "aurelia-framework";
import {Person} from "app/models/person"
import {TWPMService} from "app/twpm/twpm-svc";
import {AuthState} from "app/twpm/auth-state";

@autoinject()
export class PeopleVM {
    private twpmService: TWPMService;
    private people: Array<PersonVM> = [];

    constructor(pTWPMService: TWPMService, private authState: AuthState) {
        this.twpmService = pTWPMService;
    }

    get People (): Array<PersonVM> {
        return this.people;
    }

    activate () {
        return this.loadPeople();
    }

    loadPeople (): Promise<void> {
        this.authState.ensureAuthenticated();

        return this.twpmService.fetchPeople().then(pPeople => {
            this.people = pPeople.map(pBasePerson => new PersonVM(pBasePerson, this.authState.getInstallUrl()));
        });
    }
}

export class PersonVM {
    personID: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    profileWebURL: string;
    title: string;
    hasTitle: boolean;

    constructor(pData: Person, pInstallURL: string) {
        this.personID = pData.personID;
        this.firstName = pData.firstName;
        this.lastName = pData.lastName;
        this.avatarUrl = pData.avatarUrl;
        this.profileWebURL = `${pInstallURL}${pData.endpointURI.replace(".json", "")}`;
        this.hasTitle = pData.title && pData.title.length > 0;
        if (this.hasTitle)
            this.title = pData.title;
    }
}