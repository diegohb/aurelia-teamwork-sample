import {Container} from "aurelia-dependency-injection";
import {Person} from "app/models/person";
import {AuthUserInfo} from "app/models/auth-info";
import {TWPMClientFactory} from "app/services/twpm-client-factory";

export module AuthState {

    "use strict";
    export let apiToken: string = "";
    export let userInfo: AuthUserInfo;
    let clientFactory = Container.instance.get(TWPMClientFactory);

    export function isAuthenticated (): boolean {
        return userInfo != null;
    }
    
    export function validateApiToken(pApiToken: string, pAuthUser: AuthUserInfo): void {
        if (!isApiTokenValid(pApiToken))
            throw new Error("Api token cannot be empty!");
        if (!pAuthUser || !pAuthUser.installURL)
            throw new Error("A valid AuthUserInfo object with a valid installURL must be provided!");
        
        apiToken = pApiToken;
        userInfo = pAuthUser;
        clientFactory.baseURL = pAuthUser.installURL;
    }
    
    export function ensureAuthenticated (): void {
        if (!isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    export function reset(): void {
        if (!isAuthenticated())
            return;

        apiToken = "";
        userInfo = null;
        clientFactory.baseURL = "";
    }

    export function getInstallUrl () {
        return userInfo.installURL;
    }

    function isApiTokenValid (pApiToken: string): boolean {
        return pApiToken && pApiToken.trim().length >= 0;
    }


}