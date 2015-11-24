import {HttpClient} from "aurelia-http-client";
import {Account} from "../models/account";
import {Person} from "../models/person";

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
    export let userInfo: Person;

    export function isAuthenticated (): boolean {
        return AuthState.userInfo != null;
    }

    export function ensureAuthenticated (): void {
        if (!isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    export function reset (): void {
        if (!isAuthenticated())
            return;

        this.apiToken = "";
        this.UserInfo = null;
    }


}

class AuthUserInfo {
    installURL: string;
    userID: number;
    ID: number;
    dateFormat: string;
    companyName: string;
    companyID: number;

    constructor (data: any) {
        this.installURL = data["URL"];
        this.companyID = data["companyid"];
        this.companyName = data["companyname"];
        this.dateFormat = data["dateFormat"];
        this.ID = data["id"];
        this.userID = data["userId"];
    }

    /*
     * 
     * STATUS: "OK"
account: {userIsMemberOfOwnerCompany: true, tagsLockedToAdmins: true, firstname: "Diego", dateSeperator: "/",…}
URL: "https://mmgct.teamwork.com/"
avatar-url: "https://tw-webserver1.teamworkpm.net/sites/mmgct/images/users/c07e4e246a3b4817706b440f8882dd84%2Ejpg"
canManagePeople: "1"
canaddprojects: "1"
chatEnabled: true
code: "mmgct"
companyid: "12173"
companyname: "MMG, Inc."
dateFormat: "mm/dd/yyyy"
dateSeperator: "/"
deskEnabled: true
firstname: "Diego"
id: "69265"
lang: "EN"
lastname: "Bustamante"
likesEnabled: true
logo: "https://tw-webserver2.teamworkpm.net/sites/mmgct/images/54007%2D0%5Fmmg%5Flogo%2Ejpg"
name: "MMG, Inc."
plan-id: "1"
projectsEnabled: true
requirehttps: true
ssl-enabled: true
startonsundays: false
tagsEnabled: true
tagsLockedToAdmins: true
timeFormat: "h:mmtt"
userId: "22762"
userIsAdmin: true
userIsMemberOfOwnerCompany: true
     */

}


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