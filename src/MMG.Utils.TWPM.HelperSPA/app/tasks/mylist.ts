import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {ListTaskItemVM as TaskVM} from "./viewmodels/list-task-vm";

export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<TaskVM>;

    isAuthenticated: boolean;

    constructor () {
        this.twpmService = new TWPMService();
        this.myTasks = [];
    }

    activate () {
        return this.loadTasks();
    }

    loadTasks () {
        AuthState.ensureAuthenticated();
        return this.twpmService.fetchTasks().then(tasks => {
            this.myTasks = tasks.map(pTask => new TaskVM(pTask));
        });
    }

}