import {autoinject} from "aurelia-framework";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {ListTaskItemVM as TaskVM} from "./viewmodels/list-task-vm";

@autoinject()
export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<TaskVM>;

    isAuthenticated: boolean;

    constructor(pTWPMService: TWPMService, private authState: AuthState) {
        this.twpmService = pTWPMService;
        this.myTasks = [];
    }

    activate () {
        return this.loadTasks();
    }

    loadTasks () {
        this.authState.ensureAuthenticated();
        return this.twpmService.fetchTasks().then(tasks => {
            this.myTasks = tasks.map(pTask => new TaskVM(pTask, this.authState.getInstallUrl()));
        });
    }

}