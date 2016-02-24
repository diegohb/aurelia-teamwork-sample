///<reference path="../../typings/kendo-ui/kendo-ui.d.ts"/>

import {autoinject} from "aurelia-framework";
import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {ListTaskItemVM as TaskVM} from "./viewmodels/list-task-vm";


@autoinject()
export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<TaskVM>;
    kendoTaskSource: any;

    isAuthenticated: boolean;

    constructor (pTWPMService: TWPMService, private authState: AuthState) {
        this.twpmService = pTWPMService;
        this.myTasks = [];
        this.kendoTaskSource = null;
    }

    activate () {
        this.kendoTaskSource = {
            data: this.myTasks,
            schema: {
                model: {
                    id: "TaskID"
                }
            }
        };

        return this.loadTasks();
    }

    loadTasks () {
        var self = this;
        self.authState.ensureAuthenticated();
        //tag 'hr-training' id = 800
        return self.twpmService.fetchTasksByTag([800]).then(tasks => {
            self.myTasks = tasks.map(pTask => new TaskVM(pTask, self.authState.getInstallUrl()))
                .sort((pItem1, pItem2) => {
                    return pItem1.AssigneeDisplay.localeCompare(pItem2.AssigneeDisplay); //sort by assignee, respect non-ASCII chars
                    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                });

            self.kendoTaskSource.read();
        });
    }

}