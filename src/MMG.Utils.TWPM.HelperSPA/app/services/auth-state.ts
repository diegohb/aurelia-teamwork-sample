import {Person} from "../models/person";

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
        this.userInfo = null;
    }


}