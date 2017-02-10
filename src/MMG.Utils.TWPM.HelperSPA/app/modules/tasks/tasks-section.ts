/**
* The shell for the projects  section of the application.  Will contain either
* the project-list or project page.
*/
export class TaskSection {
    configureRouter(config, router) {
        config.map([
            { route: "", moduleId: "./task-list", nav: false, title: "" },
            { route: ":id", moduleId: "./task", nav: false, title: "" }
        ]);
    }
}
