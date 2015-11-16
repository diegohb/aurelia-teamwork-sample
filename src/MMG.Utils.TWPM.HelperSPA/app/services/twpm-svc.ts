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

        this.setSelfPartyID();
    }
    
    private setSelfPartyID () :Promise<void> {
        return this.httpClient.get("authenticate.json").then(pResponse => {
            if (!pResponse.isSuccess)
                throw new Error("Bad request from TeamworkPM.");

            var authInfo = pResponse.content.account;
            console.log(authInfo);

            this.PartyID = authInfo.userId;
        }).catch(err=> { return -1; });
    }

    fetchTasks() {
        if (!this.PartyID)
            throw new Error("User ID is not set!");

        let requestURL = `tasks.json?responsible-party-ids=${this.PartyID}&filter=today&sort=duedate`;
        return this.httpClient.get(requestURL);
    }

    
}
