import {autoinject} from "aurelia-framework"
import {HttpClient} from "aurelia-fetch-client";
import {TWPMClientFactory} from "app/services/twpm-client-factory";
import {AuthState} from "app/services/auth-state";
import {AuthUserInfo} from "app/models/auth-info"
import {Person} from "app/models/person";

@autoinject()
export class TWPMAuthService {
    private clientFactory: TWPMClientFactory;
    private httpClient: HttpClient;

    constructor(pClientFactory: TWPMClientFactory, private authState: AuthState) {
        this.clientFactory = pClientFactory;
    }

    public authenticate (pApiToken: string): Promise<any> {
        this.httpClient = this.clientFactory.createApiClient(pApiToken);

        return this.getAuthUserInfo()
            .then(pAuthInfo => {
                this.authState.validateApiToken(pApiToken, pAuthInfo);
                return {
                    Success: true,
                    Account: pAuthInfo
                };
            }).catch(err => {
                //encapsulate auth error and provide app-friendly error
                return { Success: false, ErrorMessage: err.message, Error: err };
            });
    }

    private getAuthUserInfo (): Promise<AuthUserInfo> {
        return this.httpClient.fetch("https://authenticate.teamwork.com/authenticate.json")
            .then(pResponse => {
                if (!pResponse.ok)
                    throw new Error("Bad request to TeamworkPM.");
                let promiseData: any = pResponse.json();
                return promiseData.then(pData => { return AuthUserInfo.parse(pData.account); });

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

    endAuthSession () {
        this.authState.reset();

        console.log("Logged out and reset AuthState!");
    }
}