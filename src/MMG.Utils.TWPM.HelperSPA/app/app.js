import { TWPMService } from "./twpm-svc";
export class App {
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
//# sourceMappingURL=app.js.map