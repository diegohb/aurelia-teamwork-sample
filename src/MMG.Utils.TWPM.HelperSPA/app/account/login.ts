import {TWPMService} from "../services/twpm-svc";

export class LoginVM {
    apiToken: string;
    twpmService: TWPMService;
    isAuthenticated: boolean;

    constructor () {
        this.twpmService = new TWPMService();
    }

    activate () {

    }

    authenticate () {
        this.twpmService.setApiToken(this.apiToken);
        this.isAuthenticated = true;
    }
}