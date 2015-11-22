
module TWPM {
    export class Account {

        requireHttps: boolean;
        timeTrackingEnabled: boolean;
        name: string;
        dateSignedUp: Date;
        companyname: string;
        sslEnabled: boolean;
        createdAt: Date;
        cacheUUID: string;
        accountHolderID: string;
        logo: string;
        ID: string;
        URL: string;
        emailNotificationEnabled: boolean;
        companyID: string;
        lang: string;
        code: string;

        constructor (data: any) {
            this.requireHttps = data["requirehttps"];
            this.timeTrackingEnabled = data["time-tracking-enabled"];
            this.name = data["name"];
            this.dateSignedUp = data["datesignedup"];
            this.companyname = data["companyname"];
            this.sslEnabled = data["ssl-enabled"];
            this.createdAt = data["created-at"];
            this.cacheUUID = data["cacheUUID"];
            this.accountHolderID = data["account-holder-id"];
            this.logo = data["logo"];
            this.ID = data["id"];
            this.URL = data["URL"];
            this.emailNotificationEnabled = data["email-notification-enabled"];
            this.companyID = data["companyid"];
            this.lang = data["lang"];
            this.code = data["code"];
        }

        /* {
         "requirehttps": false,
         "time-tracking-enabled": true,
         "name": "Teamwork Account Name",
         "datesignedup": "2013-03-05T00:00:00Z",
         "companyname": "Owner Company Name",
         "ssl-enabled": true,
         "created-at": "2011-08-22T12:57:00Z",
         "cacheUUID": "C14A34C3-D5AE-86A3-B9A88A5377D2CD79",
         "account-holder-id": "1",
         "logo": "http://www.someteamworkurl.com/images/349C6BDFA9EA4F814B6822C2F8C13A61%2Ejpg",
         "id": "1",
         "URL": "http://sampleaccount.teamwork.com/",
         "email-notification-enabled": true,
         "companyid": "1",
         "lang": "EN",
         "code": "teamworksitecode"
     }*/
    }
}