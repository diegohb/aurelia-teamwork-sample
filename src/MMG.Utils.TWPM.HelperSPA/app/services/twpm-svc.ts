import {TWPMAuthService, AuthState, TWPMClientFactory as ApiClientFactory } from "./twpm-auth"

export class TWPMService {

    constructor () {

    }

    fetchTasks () {
        AuthState.ensureAuthenticated();
        let partyID = AuthState.UserInfo.userID;
        let requestURL = `tasks.json?responsible-party-ids=${partyID}&filter=today&sort=duedate`;
        let apiClient = ApiClientFactory.createApiClient(AuthState.apiToken);
        return apiClient.get(requestURL);
    }


}