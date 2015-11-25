import {TWPMAuthService } from "../services/twpm-auth";
import {AuthState} from "../services/auth-state"
import {Person} from "../models/person";

export class LoginVM {
    apiToken: string;
    twpmService: TWPMAuthService;
    hasLoginError: boolean;

    constructor () {
        this.twpmService = new TWPMAuthService();

    }

    //#region "Properties"

    get UserDisplayName (): string {
        if (!this.IsAuthenticated)
            return "";

        return `${AuthState.userInfo.firstName} ${AuthState.userInfo.lastName}`;
    }

    get UserImageURL (): string {
        if (!this.IsAuthenticated)
            return "";

        return AuthState.userInfo.avatarUrl;
    }

    get IsAuthenticated (): boolean { return AuthState && AuthState.isAuthenticated(); }

    //#endregion


    activate (): Promise<any> {
        return Promise.resolve();
    }

    authenticate (): Promise<any> {
        if (this.apiToken.trim().length === 0) {
            this.hasLoginError = true;
            return Promise.reject("Api token is required!");
        }

        return this.twpmService.login(this.apiToken)
            .then((pResult) => {
                if (!pResult || pResult.Success !== true) {
                    this.hasLoginError = true;
                    //TODO: toastr - show user-friendly error
                } /*else
                    return this.confirmLoggedIn(pResult.UserInfo);*/

                return Promise.resolve();
            }).catch(err => {
                this.hasLoginError = true;
                throw err;
            });
    }

    logout () {
        this.hasLoginError = false;
        this.apiToken = "";
        this.twpmService.logout();
    }
}