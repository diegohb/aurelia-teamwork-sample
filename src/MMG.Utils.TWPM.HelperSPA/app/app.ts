import {RouterConfiguration, Router} from "aurelia-router";

export class App {
    router: Router;

    configureRouter (config: RouterConfiguration, router: Router) {
        config.title = "Wish Teamwork Did That...";
        config.map([
            { route: ["", "account/login"], name: "account-login", moduleId: "account/login", nav: true, title: "Login" },
            { route: "tasks/mine", name: "tasks-my", moduleId: "tasks/mylist", nav: true, title: "My Tasks" }
        ]);

        this.router = router;
    }
}