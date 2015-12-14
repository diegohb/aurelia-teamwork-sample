import {HttpClient} from "aurelia-fetch-client";
import "fetch";

export module TWPMClientFactory {
    "use strict";

    export let baseURL: string = "https://mmgct.teamwork.com/";

    export function createApiClient (pApiToken: string): HttpClient {
        let apiClient: HttpClient = new HttpClient();
        let authKey = `${pApiToken}:password`;
        let base64Auth = btoa(authKey);

        return apiClient.configure(config => {
            config.withBaseUrl(baseURL);
            config.withDefaults({
                headers: {
                    "Accept": "application/json",
                    "Authorization": "BASIC " + base64Auth
                }
            });

        });
    }
}