import {RouterConfiguration, Router} from "aurelia-router";

export class App {
    router: Router;

    configureRouter (config: RouterConfiguration, router: Router) {
        config.title = "Wish Teamwork Did That...";
        config.map([
            { route: ["", "account/login"], name: "account-authenticate", moduleId: "./account/login", nav: true, title: "Login" },
            { route: "tasks/mine", name: "tasks-my", moduleId: "./tasks/mylist", nav: true, title: "My Tasks" },
            { route: "people/all", name: "people-all", moduleId: "./people/people-all", nav: true, title: "Peepz" }
        ]);

        this.router = router;
    }
}