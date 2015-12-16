import {HttpClient} from "aurelia-fetch-client";
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

    async fetchPerson (pPersonID?: number): Promise<Person> {
        let personID = pPersonID || AuthState.userInfo.personID;
        return this.apiClient.fetch(`people/${personID}.json`)
            .then(this.getJson).then(pData => {
                return Person.parse(pData);
            });
    }

    async fetchPeople (): Promise<Array<Person>> {
        return this.apiClient.fetch("people.json")
            .then(this.getJson).then((pData: any) => {
                let materializedPeople: Array<Person> = pData.people.map(pPersonRaw => Person.parse(pPersonRaw));
                return materializedPeople;
            });
    }

    async fetchAllProjects (): Promise<Array<Project>> {
        return await this.apiClient.fetch("projects.json").then(pResponse => {
                if (pResponse.ok)
                    return this.getJson(pResponse);

                return Promise.reject(pResponse.error());
            })
            .then(pData => {
                return pData.projects.map(pItem => Project.parse(pItem));
            });
    }

    async fetchProjectByID (pProjectID: number): Promise<Project> {
        let requestURL = `projects/${pProjectID}.json`;
        return await this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                return Project.parse(pData.project);
            });
    }

    async fetchTasks (pPartyID?: number): Promise<Array<Task>> {

        let partyID = pPartyID || AuthState.userInfo.personID;
        let requestURL = `tasks.json?responsible-party-ids=${partyID}&filter=today&sort=duedate`;
        return await this.apiClient.fetch(requestURL)
            .then(response => {
                if (!response.ok)
                    throw new Error("Bad request from TeamworkPM.");

                return this.getJson(response).then((pData: any) => {
                    let items: Array<any> = pData["todo-items"];
                    return items.map(pItem => new Task(pItem));
                });
            });
    }

    async fetchTasksByProject (pProjectID: number): Promise<Array<Task>> {
        let requestURL = `projects/${pProjectID}/tasks.json`;
        return await this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                let rawTasks: Array<any> = pData["todo-items"];
                return rawTasks.map(pItem => new Task(pItem));
            });
    }

    private getJson (pResponse: Response): any {
        return pResponse.json();
    }


}