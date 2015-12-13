import {HttpClient} from "aurelia-http-client";
import {TWPMClientFactory as ApiClientFactory} from "app/services/twpm-client-factory";
import {AuthState} from "app/services/auth-state";
import {Task} from "app/models/task";
import {Person} from "app/models/person";

export class TWPMService {
    apiClient: HttpClient;

    constructor () {
        this.apiClient = ApiClientFactory.createApiClient(AuthState.apiToken);
    }

    fetchPerson (pPersonID?: number): Promise<Person> {
        let personID = pPersonID || AuthState.userInfo.personID;
        return this.apiClient.get(`people/${personID}.json`)
            .then(pResponse => {
                return new Person(pResponse.content.person);
            });
    }

    fetchPeople (): Promise<Array<Person>> {
        return this.apiClient.get(`people.json`)
            .then(pResponse => {
                var materializedPeople = pResponse.content.people.map(pPersonRaw => new Person(pPersonRaw));
                return materializedPeople;
            });
    }

    fetchTasks (pPartyID?: number): Promise<Array<Task>> {

        let partyID = pPartyID || AuthState.userInfo.personID;
        let requestURL = `tasks.json?responsible-party-ids=${partyID}&filter=today&sort=duedate`;
        return this.apiClient.get(requestURL).then(response => {
            if (!response.isSuccess)
                throw new Error("Bad request from TeamworkPM.");
            var tasks = response.content["todo-items"].map(pItem => {
                return new Task(pItem);
            });

            return tasks;
        });
    }


}