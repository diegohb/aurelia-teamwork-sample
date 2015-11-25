import {HttpClient} from "aurelia-http-client";
import {TWPMClientFactory} from "../services/twpm-client-factory";
import {TWPMService} from "../services/twpm-svc"
import {AuthState} from "../services/auth-state";
import {AuthUserInfo} from "../models/auth-info"
import {Person} from "../models/person";


export class TWPMAuthService {
    private httpClient: HttpClient;

    public authenticate (pApiToken: string): Promise<any> {
        this.httpClient = TWPMClientFactory.createApiClient(pApiToken);

        return this.getAuthUserInfo()
            .then(pAuthInfo => {
                AuthState.validateApiToken(pApiToken, pAuthInfo);
                let twpmService = new TWPMService();
                return twpmService.fetchPerson(pAuthInfo.userID);
            })
            .then(pPersonInfo => {
                AuthState.persistAuthentication(pPersonInfo as Person);
                return {
                    Success: true,
                    UserInfo: pPersonInfo
                };
            }).catch(err => {
                //encapsulate auth error and provide app-friendly error
                return { Success: false, ErrorMessage: err.message, Error: err };
            });
    }

    private getAuthUserInfo (): Promise<AuthUserInfo> {
        return this.httpClient.get("authenticate.json")
            .then(pResponse => {
                if (!pResponse.isSuccess)
                    throw new Error("Bad request to TeamworkPM.");

                return new AuthUserInfo(pResponse.content.account);

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
        AuthState.reset();

        console.log("Logged out and reset AuthState!");
    }
}