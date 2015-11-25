
export class AuthUserInfo {
    installURL: string;
    userID: number;
    ID: number;
    dateFormat: string;
    companyName: string;
    companyID: number;

    constructor (data: any) {
        this.installURL = data["URL"];
        this.companyID = data["companyid"];
        this.companyName = data["companyname"];
        this.dateFormat = data["dateFormat"];
        this.ID = data["id"];
        this.userID = data["userId"];
    }

    /*
     * 
     * STATUS: "OK"
account: {userIsMemberOfOwnerCompany: true, tagsLockedToAdmins: true, firstname: "Diego", dateSeperator: "/",…}
URL: "https://mmgct.teamwork.com/"
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
     */

}