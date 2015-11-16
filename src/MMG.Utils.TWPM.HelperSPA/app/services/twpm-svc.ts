import {HttpClient} from "aurelia-http-client";

export class TWPMService {

    PartyID: number;
    BaseURL: string;
    httpClient: HttpClient;

    constructor () {
        this.BaseURL = "https://mmgct.teamwork.com";
        this.httpClient = new HttpClient();
        
        this.httpClient.configure(config => {
            config.withBaseUrl(this.BaseURL);
            config.withHeader("Accept", "application/json");

        });
    }

    setApiToken (pApiToken:string) {

        var apiToken = `${pApiToken}:password`;
        var base64Auth = btoa(apiToken);

        this.httpClient.configure(config => {
            config.withHeader("Authorization", "BASIC " + base64Auth);
        });

        this.PartyID = this.getSelfPartyID();
    }
    
    private getSelfPartyID () :number {
        return 22762;
    }

    fetchTasks() {
        return this.httpClient.get("tasks.json?responsible-party-ids=22762&filter=today&sort=duedate");
    }

    
}
