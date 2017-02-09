import {singleton} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@singleton()
export class TWPMClientFactory {
    "use strict";

    private _baseURL: string = "";

    constructor(private apiClient: HttpClient) {}

    get baseURL (): string { return this._baseURL; }
    set baseURL (value: string) { this._baseURL = value; }

    createApiClient (pApiToken: string): HttpClient {
        let base64Auth = this.getEncodedAuthString(pApiToken);
        return this.apiClient.configure(config => {

            if (this.baseURL)
                config.withBaseUrl(this.baseURL);

            config.withDefaults({
                headers: {
                    "Accept": "application/json",
                    "Authorization": "BASIC " + base64Auth
                }
            });

        });
    }

    private getEncodedAuthString (pApiToken: string) {
        let authKey = `${pApiToken}:password`;
        return btoa(authKey);
    }
}