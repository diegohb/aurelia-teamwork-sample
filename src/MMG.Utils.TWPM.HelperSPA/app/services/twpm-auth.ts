import {HttpClient} from "aurelia-http-client";
import {TWPMClientFactory} from "../services/twpm-client-factory";
import {AuthState} from "../services/auth-state";
import {AuthUserInfo} from "../models/auth-info"
import {Account} from "../models/account";
import {Person} from "../models/person";


export class TWPMAuthService {
    private httpClient: HttpClient;

    public login (pApiToken: string): Promise<any> {
        AuthState.apiToken = pApiToken;
        this.httpClient = TWPMClientFactory.createApiClient(AuthState.apiToken);

        return this.getAuthUserInfo()
            .then(pAuthInfo => { return this.getPersonInfo(pAuthInfo); })
            .then(pPersonInfo => {
                AuthState.userInfo = <Person>pPersonInfo.valueOf();
                return {
                    Success: true,
                    UserInfo: pPersonInfo
                };
            }).catch(err => {
                //encapsulate auth error and provide app-friendly error
                return { Success: false, ErrorMessage: err.message };
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

    private getPersonInfo (pAuthInfo: AuthUserInfo): Promise<Person> {
        return this.httpClient.get(`people/${pAuthInfo.userID}.json`)
            .then(pResponse => {
                return new Person(pResponse.content.person);
            });
    }

    logout () {
        AuthState.reset();

        console.log("Logged out and reset AuthState!");
    }
}