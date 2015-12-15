import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {Project} from "app/models/project";

export class ProjectListVM {
    private _twpmService: TWPMService;
    private _projects: Array<Project>;

    /*private _projects: Array<Project>;*/

    constructor () {
        this._twpmService = new TWPMService();
    }

    get projects (): Array<Project> { return this._projects; }

    activate (): Promise<any> {
        AuthState.ensureAuthenticated();
        return this.loadProjects();
    }

    loadProjects (): Promise<void> {
        return this._twpmService.fetchAllProjects().then(pProjects => {
            this._projects = pProjects;
        });
    }
}