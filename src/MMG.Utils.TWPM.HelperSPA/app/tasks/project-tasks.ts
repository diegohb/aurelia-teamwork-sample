import {Project} from "app/models/project";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";

export class TasksByProjectVM {
    private _twpmService: TWPMService;
    private _project: Project;

    constructor () {
        this._twpmService = new TWPMService();
    }

    get ProjectTitle (): string {
        if (!this._project)
            return "Not Found";

        return `${this._project.company.name} - ${this._project.name}`;
    }

    activate (pActivationData: any) {
        var projectID = parseInt(pActivationData.ProjectID);
        return this.loadProject(projectID);
    }

    loadProject (pProjectID: number): Promise<Project> {
        AuthState.ensureAuthenticated();

        return this._twpmService.fetchProjectByID(pProjectID)
            .then(pProject => {
                this._project = pProject;
                return pProject;
            });
    }

}