import {TWPMService} from "../services/twpm-svc";
import {AuthState} from "../services/twpm-auth";

export class MyListVM {
    twpmService: TWPMService;
    myTasks: typeof undefined[];

    isAuthenticated: boolean;

    constructor () {
        this.twpmService = new TWPMService();
        this.myTasks = [];
    }

    activate () {
        this.isAuthenticated = AuthState.ensureAuthenticated();
    }

    loadTasks () {
        return this.twpmService.fetchTasks().then(response => {
            if (!response.isSuccess)
                throw new Error("Bad request from TeamworkPM.");

            this.myTasks = response.content["todo-items"];
        });
    }

}