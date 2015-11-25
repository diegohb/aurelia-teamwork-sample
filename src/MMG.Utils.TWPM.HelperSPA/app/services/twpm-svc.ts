import {TWPMAuthService} from "../services/twpm-auth"
import {TWPMClientFactory as ApiClientFactory} from "../services/twpm-client-factory";
import {AuthState} from "../services/auth-state";
import {Task} from "../models/task";

export class TWPMService {

    constructor () {

    }

    fetchTasks (): Promise<Array<Task>> {
        AuthState.ensureAuthenticated();
        let partyID = AuthState.userInfo.personID;
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