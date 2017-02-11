import {autoinject} from "aurelia-framework";
import {TWPMAuthService} from "app/twpm/twpm-auth";
import {AuthState} from "app/twpm/auth-state"
import {Person} from "app/models/person";

@autoinject()
export class LoginVM {
    apiToken: string = "";
    twpmService: TWPMAuthService;
    hasLoginError: boolean;

    constructor(pTWPMService: TWPMAuthService, private authState: AuthState) {
        this.twpmService = pTWPMService;

    }

    //#region "Properties"

    get UserDisplayName (): string {
        if (!this.IsAuthenticated)
            return "";

        return `${this.authState.userInfo.firstName} ${this.authState.userInfo.lastName}`;
    }

    get UserImageURL (): string {
        if (!this.IsAuthenticated)
            return "";

        return this.authState.userInfo.avatarUrl;
    }

    get IsAuthenticated (): boolean { return this.authState && this.authState.isAuthenticated(); }

    //#endregion


    activate (): Promise<any> {
        return Promise.resolve();
    }

    login (): Promise<any> {
        if (this.apiToken.trim().length === 0) {
            let errMsg = "Api token is required!";
            this.showUserError(errMsg);
            return Promise.reject(errMsg);
        }

        return this.twpmService.authenticate(this.apiToken)
            .then((pResult) => {
                if (!pResult || pResult.Success !== true) {
                    this.showUserError(pResult.ErrorMessage, pResult.Error);
                }
                return Promise.resolve();
            }).catch(err => {
                this.showUserError("Unexpected error!", err);
            });
    }

    logout () {
        this.hasLoginError = false;
        this.apiToken = "";
        this.twpmService.endAuthSession();
    }

    private showUserError (pMessage?: string, pError?: Error): void {
        if (pMessage) {
            //todo: toastr - show message
        }
        console.error("Error occurred authenticating.", pError);
        this.hasLoginError = true;
    }

}