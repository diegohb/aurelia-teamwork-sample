export class TaskSection {
    configureRouter(config, router) {
        config.map([
            { route: "", moduleId: "./task-list", nav: false, title: "" },
            { route: "tasks/mine", moduleId: "./mylist", nav: true, title: "My Tasks" },
            { route: "tasks/training", moduleId: "./training", nav: true, title: "Training Tasks" },
            { route: "tasks/by-project", moduleId: "./project-tasks", nav: true, title: "Project Tasks" },
            { route: ":id", moduleId: "./task", nav: false, title: "" }
        ]);
    }
}
