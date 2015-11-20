import {HttpClient} from "aurelia-http-client";

export module TWPMClientFactory {
    "use strict";

    export let baseURL: string = "https://mmgct.teamwork.com";

    export function createApiClient (pApiToken: string): HttpClient {
        let apiClient: HttpClient = new HttpClient();
        let authKey = `${pApiToken}:password`;
        let base64Auth = btoa(authKey);

        return apiClient.configure(config => {
            config.withBaseUrl(baseURL);
            config.withHeader("Accept", "application/json");
            config.withHeader("Authorization", "BASIC " + base64Auth);
        });
    }
}

export module AuthState {
    "use strict";
    export let apiToken: string = "";
    export let userID: number = -1;

    export function ensureAuthenticated (): boolean {
        if (AuthState.userID === -1)
            throw new Error("Not authenticated with TeamworkPM!");

        return true;
    }
}

export class TWPMAuthService {
    private httpClient: HttpClient;

    public login (pApiToken: string) {
        AuthState.apiToken = pApiToken;
        var apiClient = TWPMClientFactory.createApiClient(AuthState.apiToken);
        this.setSelfPartyID(apiClient).then(pUserID => { AuthState.userID = pUserID; });
    }

    private setSelfPartyID (pApiClient: HttpClient): Promise<number> {
        return pApiClient.get("authenticate.json").then(pResponse => {
            if (!pResponse.isSuccess)
                throw new Error("Bad request to TeamworkPM.");

            var authInfo = pResponse.content.account;
            console.log(authInfo);

            return authInfo.userId;
        }).catch(err => {
            return Promise.reject(err.message != null ? err.message : err.stringify);
        });
    }


}