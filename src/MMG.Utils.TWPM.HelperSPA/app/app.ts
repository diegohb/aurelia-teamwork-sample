import {RouterConfiguration, Router} from "aurelia-router";

export class App {
    router: Router;

    configureRouter (config: RouterConfiguration, router: Router) {
        config.title = "Wish Teamwork Did That...";
        config.map([
            { route: ["", "account/login"], name: "account-authenticate", moduleId: "app/account/login", nav: true, title: "Login" },
            { route: "projects/all", name: "project-all", moduleId: "app/projects/project-list", nav: true, title: "All Projects" },
            { route: "tasks/mine", name: "tasks-my", moduleId: "app/tasks/mylist", nav: true, title: "My Tasks" },
            { route: "people/all", name: "people-all", moduleId: "app/people/people-all", nav: true, title: "Peepz" }
        ]);

        this.router = router;
    }
}