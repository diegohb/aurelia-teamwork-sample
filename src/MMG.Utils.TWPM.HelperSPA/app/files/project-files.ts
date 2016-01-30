import {autoinject} from "aurelia-framework";
import {Project} from "app/models/project";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";

@autoinject()
export class FilesByProjectVM {
    private _twpmService: TWPMService;
    private authState: AuthState;
    private _project: Project;
    private _files:Array<any>;

    constructor(pTWPMService: TWPMService, pAuthState: AuthState) {
        this._twpmService = pTWPMService;
        this.authState = pAuthState;
        this._files = [];
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

    async loadProject (pProjectID: number): Promise<void> {
        this.authState.ensureAuthenticated();
        var self = this;

        function getProject () {
            return self._twpmService.fetchProjectByID(pProjectID)
                .then(pProject => {
                    self._project = pProject;
                    return Promise.resolve();
                });
        }

        /*function getTasks() {
            return self._twpmService.fetchTasksByProject(pProjectID)
                .then(tasks => {
                    self._tasks = tasks.map(pTask => new TaskVM(pTask, self.authState.getInstallUrl()));
                })
                .then(pTasks => {
                    return Promise.resolve();
                });
        }*/

        /* NOTE; this is not working although it should.
        let promises: [Promise<Project>, Promise<Task[]>] = [getProject(), getTasks()];
        return await Promise.all(promises);
        */

        return getProject() /*.then(getTasks)*/;
    }
}