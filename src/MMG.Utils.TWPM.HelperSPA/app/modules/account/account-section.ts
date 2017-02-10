export class AccountSection {
    configureRouter(config, router) {
        config.map([
            { route: "", moduleId: "./login", nav: true, title: "Login" }
        ]);
    }
}
