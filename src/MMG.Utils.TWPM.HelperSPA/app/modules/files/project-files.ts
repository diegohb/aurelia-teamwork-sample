import {autoinject} from "aurelia-framework";
import {Project} from "app/models/project";
import {TWFile} from "app/models/twfile";
import {TWPMService} from "app/twpm/twpm-svc";
import {AuthState} from "app/twpm/auth-state";

@autoinject()
export class FilesByProjectVM {
    private _twpmService: TWPMService;
    private authState: AuthState;
    private _project: Project;
    private _files: Array<TWFile>;

    constructor (pTWPMService: TWPMService, pAuthState: AuthState) {
        this._twpmService = pTWPMService;
        this.authState = pAuthState;
        this._files = [];
    }

    get ProjectTitle (): string {
        if (!this._project)
            return "Not Found";

        return `${this._project.company.name} - ${this._project.name}`;
    }

    get ProjectFiles (): Array<TWFile> {
        return this._files;
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

        function getFiles () {
            return self._twpmService.fetchFilesByProject(pProjectID)
                .then(pFiles => {
                    self._files = pFiles;
                    return Promise.resolve();
                });
        }

        /* NOTE; this is not working although it should.
        let promises: [Promise<Project>, Promise<Task[]>] = [getProject(), getTasks()];
        return await Promise.all(promises);
        */

        return getProject().then(getFiles);
    }
}