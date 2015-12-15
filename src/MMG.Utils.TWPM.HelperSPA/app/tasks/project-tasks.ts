import {Project} from "app/models/project";

export class TasksByProjectVM {
    private _projectID: number;
    private _project: Project;

    constructor () {

    }

    activate (pActivationData: any) {
        var projectID = parseInt(pActivationData.ProjectID);
        this._projectID = projectID;
    }

    get ProjectName (): number { return this._projectID; }


}