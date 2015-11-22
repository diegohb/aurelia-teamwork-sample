import {TWPMAuthService, AuthState, TWPMClientFactory as ApiClientFactory } from "./twpm-auth"
import {Task} from "../models/task";

export class TWPMService {

    constructor () {

    }

    fetchTasks (): Promise<Array<Task>> {
        AuthState.ensureAuthenticated();
        let partyID = AuthState.UserInfo.UserID;
        let requestURL = `tasks.json?responsible-party-ids=${partyID}&filter=today&sort=duedate`;
        let apiClient = ApiClientFactory.createApiClient(AuthState.apiToken);
        return apiClient.get(requestURL).then(response => {
            if (!response.isSuccess)
                throw new Error("Bad request from TeamworkPM.");
            var tasks = response.content["todo-items"].map(pItem => {
                return new Task(pItem);
            });

            return tasks;
        });
    }
}