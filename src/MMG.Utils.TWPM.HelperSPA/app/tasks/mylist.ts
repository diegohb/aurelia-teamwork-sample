import {TWPMService} from "../services/twpm-svc";
import {AuthState} from "../services/auth-state";
import {Task} from "../models/task";

export class MyListVM {
    twpmService: TWPMService;
    myTasks: Array<Task>;

    isAuthenticated: boolean;

    constructor () {
        this.twpmService = new TWPMService();
        this.myTasks = [];
    }

    activate () {

    }

    loadTasks () {
        AuthState.ensureAuthenticated();
        return this.twpmService.fetchTasks().then(tasks => {
            this.myTasks = tasks;
        });
    }

}