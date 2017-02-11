import {autoinject} from "aurelia-framework";
import {Task} from "app/models/task";
import {Project} from "app/models/project";
import {ListTaskItemVM as TaskVM} from "./viewmodels/list-task-vm";
import {TWPMService} from "app/twpm/twpm-svc";
import {AuthState} from "app/twpm/auth-state";

@autoinject()
export class TasksByProjectVM {
    private _twpmService: TWPMService;
    private _project: Project;
    private _tasks: Array<TaskVM>;

    constructor(pTWPMService: TWPMService, private authState: AuthState) {
        this._twpmService = pTWPMService;
        this._tasks = [];
    }

    get ProjectTitle (): string {
        if (!this._project)
            return "Not Found";

        return `${this._project.company.name} - ${this._project.name}`;
    }

    get ProjectTasks (): Array<TaskVM> {
        return this._tasks;
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

        function getTasks () {
            return self._twpmService.fetchTasksByProject(pProjectID)
                .then(tasks => {
                    self._tasks = tasks.map(pTask => new TaskVM(pTask, self.authState.getInstallUrl()));
                })
                .then(pTasks => {
                    return Promise.resolve();
                });
        }

        /* NOTE; this is not working although it should.
        let promises: [Promise<Project>, Promise<Task[]>] = [getProject(), getTasks()];
        return await Promise.all(promises);
        */

        return getProject().then(getTasks);
    }

}