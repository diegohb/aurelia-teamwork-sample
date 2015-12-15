﻿import {HttpClient} from "aurelia-fetch-client";
import "fetch";
import {TWPMClientFactory as ApiClientFactory} from "app/services/twpm-client-factory";
import {AuthState} from "app/services/auth-state";
import {Project} from "app/models/project";
import {Task} from "app/models/task";
import {Person} from "app/models/person";

export class TWPMService {
    apiClient: HttpClient;

    constructor () {
        this.apiClient = ApiClientFactory.createApiClient(AuthState.apiToken);
    }

    fetchPerson (pPersonID?: number): Promise<Person> {
        let personID = pPersonID || AuthState.userInfo.personID;
        return this.apiClient.fetch(`people/${personID}.json`)
            .then(this.getJson).then(pData => {
                return new Person(pData.person);
            });
    }

    fetchPeople (): Promise<Array<Person>> {
        return this.apiClient.fetch("people.json")
            .then(this.getJson).then((pData: any) => {
                let materializedPeople: Array<Person> = pData.people.map(pPersonRaw => new Person(pPersonRaw));
                return materializedPeople;
            });
    }

    fetchAllProjects (): Promise<Array<Project>> {
        return this.apiClient.fetch("projects.json").then(this.getJson)
            .then(pData => {
                return pData.projects.map(pItem => new Project(pItem));
            });
    }

    fetchProjectByID (pProjectID: number): Promise<Project> {
        let requestURL = `projects/${pProjectID}.json`;
        return this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                return new Project(pData.project);
            });
    }

    fetchTasks (pPartyID?: number): Promise<Array<Task>> {

        let partyID = pPartyID || AuthState.userInfo.personID;
        let requestURL = `tasks.json?responsible-party-ids=${partyID}&filter=today&sort=duedate`;
        return this.apiClient.fetch(requestURL)
            .then(response => {
                if (!response.ok)
                    throw new Error("Bad request from TeamworkPM.");

                return this.getJson(response).then((pData: any) => {
                    let items: Array<any> = pData["todo-items"];
                    return items.map(pItem => new Task(pItem));
                });
            });
    }

    fetchTasksByProject (pProjectID: number): Promise<Array<Task>> {
        let requestURL = `projects/${pProjectID}/tasks.json`;
        return this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                let rawTasks: Array<any> = pData["todo-items"];
                return rawTasks.map(pItem => new Task(pItem));
            });
    }

    private getJson (pResponse: Response): any {
        return pResponse.json();
    }


}