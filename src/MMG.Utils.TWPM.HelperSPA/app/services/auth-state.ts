import {autoinject, singleton} from "aurelia-dependency-injection";
import {Person} from "app/models/person";
import {AuthUserInfo} from "app/models/auth-info";
import {TWPMClientFactory} from "app/services/twpm-client-factory";

@singleton()
@autoinject()
export class AuthState {
    "use strict";

    public apiToken: string = "";
    public userInfo: AuthUserInfo;
    private clientFactory: TWPMClientFactory;

    constructor (pClientFactory: TWPMClientFactory) {
        this.clientFactory = pClientFactory;
    }

    isAuthenticated (): boolean {
        return this.userInfo != null;
    }
    
    validateApiToken(pApiToken: string, pAuthUser: AuthUserInfo): void {
        if (!this.isApiTokenValid(pApiToken))
            throw new Error("Api token cannot be empty!");
        if (!pAuthUser || !pAuthUser.installURL)
            throw new Error("A valid AuthUserInfo object with a valid installURL must be provided!");
        
        this.apiToken = pApiToken;
        this.userInfo = pAuthUser;
        this.clientFactory.baseURL = pAuthUser.installURL;
    }
    
    ensureAuthenticated (): void {
        if (!this.isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    reset(): void {
        if (!this.isAuthenticated())
            return;

        this.apiToken = "";
        this.userInfo = null;
        this.clientFactory.baseURL = "";
    }

    getInstallUrl () {
        return this.userInfo.installURL;
    }

    private isApiTokenValid (pApiToken: string): boolean {
        return pApiToken && pApiToken.trim().length >= 0;
    }


}