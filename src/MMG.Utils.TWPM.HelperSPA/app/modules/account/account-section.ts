export class AccountSection {
    configureRouter(config, router) {
        config.map([
            { name:"login", route: "", moduleId: "./login", nav: true, title: "Login" }
        ]);
    }
}
