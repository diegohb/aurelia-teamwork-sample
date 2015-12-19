
export class AuthUserInfo {
    installURL: string;
    userID: number;
    accountID: number;
    dateFormat: string;
    companyName: string;
    companyID: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;

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
        obj.firstName = data.firstname;
        obj.lastName = data.lastname;
        obj.avatarUrl = data["avatar-url"];
        return obj;
    }
}


    /*
     * 
     * STATUS: "OK"
account: {
URL: "https://mycompany.teamwork.com/"
avatar-url: "https://tw-webserver1.teamworkpm.net/sites/mycompany/images/users/c07e4e246a3b4817f706b440f8882dd84%2Ejpg"
canManagePeople: "1"
canaddprojects: "1"
chatEnabled: true
code: "myabc"
companyid: "65656"
companyname: "MMG, Inc."
dateFormat: "mm/dd/yyyy"
dateSeperator: "/"
deskEnabled: true
firstname: "Diego"
id: "99999"
lang: "EN"
lastname: "Bustamante"
likesEnabled: true
logo: "https://tw-webserver2.teamworkpm.net/sites/mycompany/images/5400f7%2D0%5Fmmg%5Flogo%2Ejpg"
name: "MMG, Inc."
plan-id: "1"
projectsEnabled: true
requirehttps: true
ssl-enabled: true
startonsundays: false
tagsEnabled: true
tagsLockedToAdmins: true
timeFormat: "h:mmtt"
userId: "78748"
userIsAdmin: true
userIsMemberOfOwnerCompany: true
}
     */