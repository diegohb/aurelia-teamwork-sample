import {autoinject} from "aurelia-framework";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {Project} from "app/models/project";

@autoinject()
export class ProjectListVM {
    private _twpmService: TWPMService;
    private _projects: Array<Project>;

    /*private _projects: Array<Project>;*/

    constructor(pTWPMService: TWPMService) {
        this._twpmService = pTWPMService;
    }

    get projects(): Array<Project> { return this._projects; }
    
    activate (): Promise<any> {
        return this.loadProjects();
    }

    loadProjects (): Promise<void> {
        AuthState.ensureAuthenticated();

        return this._twpmService.fetchAllProjects().then(pProjects => {
            this._projects = pProjects;
        });
    }

    getCompanyUrl(pCompanyID: number) {
        var base = AuthState.getInstallUrl() + "companies";
        return base + "/" + pCompanyID;
    }

}