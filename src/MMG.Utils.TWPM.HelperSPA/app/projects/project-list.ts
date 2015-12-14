import {TWPMService} from "app/services/twpm-svc";

export class ProjectListVM {
    private _twpmService: TWPMService;

    /*private _projects: Array<Project>;*/

    constructor () {
        this._twpmService = new TWPMService();
    }

    activate (): Promise<any> {
        return Promise.resolve();
    }
}