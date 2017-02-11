import {Router, RouterConfiguration} from "aurelia-router";

export class ProjectSection {

    private _router: Router;

    configureRouter(pConfig: RouterConfiguration, pRouter: Router) {
        pConfig.map([
            { route: "", redirect: "project-list" },
            { route: "project-list", moduleId: "./project-list", nav: true, title: "All Projects" },
            /*{ route: ":id", moduleId: "./project", nav: false, title: "" }*/
        ]);

        this._router = pRouter;
    }

    get Router(): Router { return this._router; }

}