export class Account {
    requireHttps: boolean;
    timeTrackingEnabled: boolean;
    name: string;
    dateSignedUp: Date;
    companyname: string;
    sslEnabled: boolean;
    createdAt: Date;
    cacheUUID: string;
    accountHolderID: number;
    logo: string;
    userID: number;
    accountURL: string;
    emailNotificationEnabled: boolean;
    companyID: number;
    lang: string;
    code: string;

    constructor () {

    }

    get endpointURI (): string {
        return "account.json";
    }

    static parse (pRawData: any): Account {
        let data = pRawData.account || pRawData;
        let obj = new Account();
        obj.requireHttps = data["requirehttps"] === true;
        obj.timeTrackingEnabled = data["time-tracking-enabled"] === true;
        obj.name = data["name"];
        obj.dateSignedUp = data["datesignedup"]; //TODO: moment
        obj.companyname = data["companyname"];
        obj.sslEnabled = data["ssl-enabled"] === true;
        obj.createdAt = data["created-at"]; //TODO: moment
        obj.cacheUUID = data["cacheUUID"];
        obj.accountHolderID = parseInt(data["account-holder-id"]);
        obj.logo = data["logo"];
        obj.userID = parseInt(data["id"]);
        obj.accountURL = data["URL"];
        obj.emailNotificationEnabled = data["email-notification-enabled"] === true;
        obj.companyID = parseInt(data["companyid"]);
        obj.lang = data["lang"];
        obj.code = data["code"];
        return obj;
    }

    /*
     * {
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
  }
     * 
     */


}