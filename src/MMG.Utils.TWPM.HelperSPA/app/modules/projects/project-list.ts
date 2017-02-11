import {autoinject} from "aurelia-framework";
import {TWPMService} from "app/twpm/twpm-svc";
import {AuthState} from "app/twpm/auth-state";
import {Project} from "app/models/project";

@autoinject()
export class ProjectListVM {
    private _twpmService: TWPMService;
    private _projects: Array<Project>;

    /*private _projects: Array<Project>;*/

    constructor(pTWPMService: TWPMService, private authState: AuthState) {
        this._twpmService = pTWPMService;
    }

    get projects(): Array<Project> { return this._projects; }
    
    activate (): Promise<any> {
        return this.loadProjects();
    }

    loadProjects (): Promise<void> {
        this.authState.ensureAuthenticated();

        return this._twpmService.fetchAllProjects().then(pProjects => {
            this._projects = pProjects;
        });
    }

    getCompanyUrl(pCompanyID: number) {
        var base = this.authState.getInstallUrl() + "companies";
        return base + "/" + pCompanyID;
    }

}