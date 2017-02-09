import {autoinject, transient} from "aurelia-framework"
import {HttpClient} from "aurelia-fetch-client";
import {TWPMClientFactory as ApiClientFactory} from "./twpm-client-factory";
import {AuthState} from "./auth-state";
import {Project} from "../models/project";
import {Task} from "../models/task";
import {Person} from "../models/person";
import {TWFile} from "../models/twfile";

@transient()
@autoinject()
export class TWPMService {
    apiClient: HttpClient;

    constructor (pClientFactory: ApiClientFactory, private authState: AuthState) {
        this.apiClient = pClientFactory.createApiClient(this.authState.apiToken);
    }

    async fetchPerson (pPersonID?: number): Promise<Person> {
        let personID = pPersonID || this.authState.userInfo.userID;
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

        let partyID = pPartyID || this.authState.userInfo.userID;
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

    async fetchTasksByTag (pTags: Array<number>): Promise<Array<Task>> {

        let requestURL = `tasks.json?tag-ids=${pTags.join(",")}&sort=duedate&includeCompletedTasks=true`;
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
        let requestURL = `projects/${pProjectID}/tasks.json?includeCompletedTasks=true`;
        return await this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                let rawTasks: Array<any> = pData["todo-items"];
                return rawTasks.map(pItem => new Task(pItem));
            });
    }

    async fetchFilesByProject (pProjectID: number): Promise<Array<TWFile>> {
        let requestURL = `projects/${pProjectID}/files.json`;
        let installURL = this.authState.getInstallUrl();
        return await this.apiClient.fetch(requestURL).then(this.getJson)
            .then(pData => {
                let rawFiles: Array<any> = pData.project.files;
                return rawFiles.map(pItem => TWFile.parse(pItem, installURL));
            });
    }

    private getJson (pResponse: Response): any {
        return pResponse.json();
    }


}