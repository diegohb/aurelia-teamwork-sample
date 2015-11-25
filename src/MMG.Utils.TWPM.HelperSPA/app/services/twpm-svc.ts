import {HttpClient} from "aurelia-http-client";
import {TWPMAuthService} from "../services/twpm-auth"
import {TWPMClientFactory as ApiClientFactory} from "../services/twpm-client-factory";
import {AuthState} from "../services/auth-state";
import {Task} from "../models/task";

export class TWPMService {
    apiClient: HttpClient;

    constructor () {
        AuthState.ensureAuthenticated();
        this.apiClient = ApiClientFactory.createApiClient(AuthState.apiToken);
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