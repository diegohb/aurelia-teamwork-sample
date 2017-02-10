/**
* The shell for the projects  section of the application.  Will contain either
* the project-list or project page.
*/
export class ProjectSection {
    configureRouter(config, router) {
        config.map([
            { route: "", moduleId: "./project-list", nav: false, title: "" },
            { route: ":id", moduleId: "./project", nav: false, title: "" }
        ]);
    }
}
