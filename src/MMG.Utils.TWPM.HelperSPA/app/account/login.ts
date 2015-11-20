import {TWPMAuthService} from "../services/twpm-auth";

export class LoginVM {
    apiToken: string;
    twpmService: TWPMAuthService;
    isAuthenticated: boolean;

    constructor () {
        this.twpmService = new TWPMAuthService();
    }

    activate () {

    }

    authenticate () {
        this.twpmService.login(this.apiToken);
        this.isAuthenticated = true;
    }
}