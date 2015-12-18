
export class AuthUserInfo {
    installURL: string;
    userID: number;
    accountID: number;
    dateFormat: string;
    companyName: string;
    companyID: number;

    constructor () {

    }

    get endpointURI (): string {
        return "authenticate.json";
    }

    static parse (pRawData: any): AuthUserInfo {
        let data = pRawData.account || pRawData;
        let obj = new AuthUserInfo();
        obj.installURL = data["URL"];
        obj.companyID = parseInt(data["companyid"]);
        obj.companyName = data["companyname"];
        obj.dateFormat = data["dateFormat"];
        obj.accountID = parseInt(data["id"]);
        obj.userID = parseInt(data["userId"]);
        return obj;
    }

    /*
     * 
     * STATUS: "OK"
account: {
URL: "https://mycompany.teamwork.com/"
avatar-url: "https://tw-webserver1.teamworkpm.net/sites/mmgct/images/users/c07e4e246a3b4817706b440f8882dd84%2Ejpg"
canManagePeople: "1"
canaddprojects: "1"
chatEnabled: true
code: "mmgct"
companyid: "12173"
companyname: "MMG, Inc."
dateFormat: "mm/dd/yyyy"
dateSeperator: "/"
deskEnabled: true
firstname: "Diego"
id: "69265"
lang: "EN"
lastname: "Bustamante"
likesEnabled: true
logo: "https://tw-webserver2.teamworkpm.net/sites/mmgct/images/54007%2D0%5Fmmg%5Flogo%2Ejpg"
name: "MMG, Inc."
plan-id: "1"
projectsEnabled: true
requirehttps: true
ssl-enabled: true
startonsundays: false
tagsEnabled: true
tagsLockedToAdmins: true
timeFormat: "h:mmtt"
userId: "22762"
userIsAdmin: true
userIsMemberOfOwnerCompany: true
}
     */

}