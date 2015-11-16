import {TWPMService} from "../services/twpm-svc";

export class App {
    twpmService: TWPMService;
    myTasks: typeof undefined[];

    constructor() {
        this.twpmService = new TWPMService();
        this.myTasks = [];
    }

    activate() {
        return this.twpmService.fetchTasks().then(response => {
            if (!response.isSuccess)
                throw new Error("Bad request from TeamworkPM.");

            this.myTasks = response.content["todo-items"];
        });
    }

    
}