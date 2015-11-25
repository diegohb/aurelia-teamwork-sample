﻿import {HttpClient} from "aurelia-http-client";
import {TWPMClientFactory as ApiClientFactory} from "../services/twpm-client-factory";
import {AuthState} from "../services/auth-state";
import {Task} from "../models/task";
import {Person} from "../models/person";

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

    fetchTasks (): Promise<Array<Task>> {

        let partyID = AuthState.userInfo.personID;
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