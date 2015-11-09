import {HttpClient} from "aurelia-http-client";

export class TWPMService {

    constructor () {
        this.httpClient = new HttpClient();
        
        var apiToken = "horse965dry:password";
        var base64auth = btoa(apiToken);

        this.httpClient.configure(config => {
            config.withBaseUrl("https://mmgct.teamwork.com/");
            config.withHeader("Authorization", "BASIC " + base64auth)
                .withHeader("Accept", "application/json");

        });
    }
    
    fetchTasks() {
        return this.httpClient.get("tasks.json?responsible-party-ids=22762&filter=today&sort=duedate");
    }
    
}
