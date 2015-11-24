import {TWPMAuthService, AuthState } from "../services/twpm-auth";
import {Person} from "../models/person";

export class LoginVM {
    apiToken: string;
    twpmService: TWPMAuthService;
    isAuthenticated: boolean;
    hasLoginError: boolean;
    UserDisplayName: string;
    UserImageURL: string;

    constructor () {
        this.twpmService = new TWPMAuthService();
    }

    activate () {
        this.isAuthenticated = AuthState.isAuthenticated();
        if (this.isAuthenticated)
            return this.confirmLoggedIn(AuthState.userInfo);
    }

    authenticate () {
        return this.twpmService.login(this.apiToken)
            .then((pResult) => {
                this.isAuthenticated = pResult.Success;
                if (!pResult || pResult.Success !== true) {
                    this.hasLoginError = true;
                    //TODO: toastr - show user-friendly error
                } else
                    return this.confirmLoggedIn(pResult.UserInfo);

                return Promise.resolve();
            }).catch(err => {
                this.isAuthenticated = false;
                this.hasLoginError = true;
                throw err;
            });
    }

    logout () {
        this.reset(null);
        this.isAuthenticated = false;
        this.hasLoginError = false;
        this.apiToken = "";
        this.twpmService.logout();
    }

    reset (pEvent): boolean {
        if (this.hasLoginError) {
            this.isAuthenticated = false;
            this.hasLoginError = false;
        }

        return true;
    }

    //TODO: make this private
    private confirmLoggedIn (pUser: Person): Promise<void> {
        this.UserDisplayName = `${pUser.firstName} ${pUser.lastName}`;
        this.UserImageURL = pUser.avatarUrl;

        return Promise.resolve();
    }


}