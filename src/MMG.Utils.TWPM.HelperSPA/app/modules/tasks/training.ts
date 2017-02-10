import {autoinject} from "aurelia-framework";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {ListTaskItemVM as TaskVM} from "./viewmodels/list-task-vm";

@autoinject()
export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<TaskVM>;

    isAuthenticated: boolean;

    constructor (pTWPMService: TWPMService, private authState: AuthState) {
        this.twpmService = pTWPMService;
        this.myTasks = [];
    }

    activate () {
        return this.loadTasks();
    }

    loadTasks () {
        this.authState.ensureAuthenticated();
        //tag 'hr-training' id = 800
        return this.twpmService.fetchTasksByTag([800]).then(tasks => {
            this.myTasks = tasks.map(pTask => new TaskVM(pTask, this.authState.getInstallUrl()))
                .sort((pItem1, pItem2) => {
                    return pItem1.AssigneeDisplay.localeCompare(pItem2.AssigneeDisplay); //sort by assignee, respect non-ASCII chars
                    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                });
        });
    }

}