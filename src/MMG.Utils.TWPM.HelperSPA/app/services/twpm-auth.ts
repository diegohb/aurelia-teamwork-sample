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

    export function isAuthenticated (): boolean {
        return AuthState.userID !== -1;
    }

    export function ensureAuthenticated (): void {
        if (!isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    export function reset (): void {
        if (!isAuthenticated())
            return;

        this.apiToken = "";
        this.userID = -1;
    }
}

export class TWPMAuthService {
    private httpClient: HttpClient;

    public login (pApiToken: string): Promise<any> {
        AuthState.apiToken = pApiToken;
        let apiClient = TWPMClientFactory.createApiClient(AuthState.apiToken);
        return this.setSelfPartyID(apiClient).then(pUserInfo => {
            AuthState.userID = pUserInfo.userId;
            return {
                Success: true,
                UserInfo: pUserInfo
            };
        }).catch(err => {
            //encapsulate auth error and provide app-friendly error
            return { Success: false, ErrorMessage: err.message };
        });
    }

    private setSelfPartyID (pApiClient: HttpClient): Promise<any> {
        return pApiClient.get("authenticate.json").then(pResponse => {
            if (!pResponse.isSuccess)
                throw new Error("Bad request to TeamworkPM.");

            let userInfo = pResponse.content.account;
            console.log(userInfo);
            return userInfo;

        }).catch(err => {
            let translatedError: any;
            switch (err.statusCode) {
            case 401:
                translatedError = new Error("Invalid API Token!");
                break;
            default:
                translatedError = new Error(`Unspecified error - ${err.statusText}`);
                break;
            }
            return Promise.reject(translatedError);
        });
    }

    logout () {
        AuthState.reset();

        console.log("Logged out and reset AuthState!");
    }
}