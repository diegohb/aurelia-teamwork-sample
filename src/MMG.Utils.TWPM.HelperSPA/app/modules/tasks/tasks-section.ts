import {Router, RouterConfiguration} from "aurelia-router"

export class TaskSection {

    private _router:Router;

    configureRouter(pConfig: RouterConfiguration, pRouter:Router) {
        pConfig.map([
            /*{ route: "", moduleId: "./task-list", nav: false, title: "" },*/
            { route: "", redirect: "mine" },
            { name:"mytasks", route: "mine", moduleId: "./mylist", nav: true, title: "My Tasks" },
            { route: "training", moduleId: "./training", nav: true, title: "Training Tasks" },
            { route: "by-project", name: "tasks-by-project", moduleId: "./project-tasks", nav: false, title: "Project Tasks" },
            /*{ route: ":id", moduleId: "./task", nav: false, title: "" }*/
        ]);

        this._router = pRouter;
    }

    get Router(): Router { return this._router; }
    
}
