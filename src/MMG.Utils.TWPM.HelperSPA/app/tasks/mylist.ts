import {TWPMService} from "app/services/twpm-svc";
import {AuthState} from "app/services/auth-state";
import {Task} from "app/models/task";

export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<Task>;

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
            this.myTasks = tasks;
        });
    }

}