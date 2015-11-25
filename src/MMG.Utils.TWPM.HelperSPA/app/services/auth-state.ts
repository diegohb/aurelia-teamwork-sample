import {Person} from "../models/person";
import {AuthUserInfo} from "../models/auth-info";

export module AuthState {

    "use strict";
    export let apiToken: string = "";
    export let userInfo: Person;
    let authenticatedUser: AuthUserInfo;

    export function isAuthenticated (): boolean {
        return authenticatedUser != null && userInfo != null;
    }

    export function validateApiToken (pApiToken: string, pAuthUser: AuthUserInfo): void {
        if (!isApiTokenValid(pApiToken))
            throw new Error("Api token cannot be empty!");

        apiToken = pApiToken;
        authenticatedUser = pAuthUser;
    }

    export function persistAuthentication (pPersonInfo: Person): void {
        if (!pPersonInfo)
            throw new Error("Person object cannot be null!");
        if (!isApiTokenValid(apiToken) || !authenticatedUser)
            throw new Error("Invalid state for authentication object.");

        userInfo = pPersonInfo;
    }

    export function ensureAuthenticated (): void {
        if (!isAuthenticated())
            throw new Error("Not authenticated with TeamworkPM!");
    }

    export function reset (): void {
        if (!isAuthenticated())
            return;

        apiToken = "";
        userInfo = null;
    }

    function isApiTokenValid (pApiToken: string): boolean {
        return pApiToken && pApiToken.trim().length >= 0;
    }


}