import { HttpClient } from "aurelia-http-client";
export class TWPMService {
    constructor() {
        this.BaseURL = "https://mmgct.teamwork.com";
        this.httpClient = new HttpClient();
        this.httpClient.configure(config => {
            config.withBaseUrl(this.BaseURL);
            config.withHeader("Accept", "application/json");
        });
    }
    setApiToken(pApiToken) {
        var apiToken = `${pApiToken}:password`;
        var base64Auth = btoa(apiToken);
        this.httpClient.configure(config => {
            config.withHeader("Authorization", "BASIC " + base64Auth);
        });
        this.PartyID = this.getSelfPartyID();
    }
    getSelfPartyID() {
        return 22762;
    }
    fetchTasks() {
        let requestURL = `tasks.json?responsible-party-ids=${this.PartyID}&filter=today&sort=duedate`;
        return this.httpClient.get(requestURL);
    }
}
//# sourceMappingURL=twpm-svc.js.map