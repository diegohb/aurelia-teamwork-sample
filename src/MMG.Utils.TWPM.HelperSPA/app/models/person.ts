export class Person {
    personID: number;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    title: string;
    companyID: number;
    isAdmin: boolean;
    lastLogin: any;

    constructor () {

    }

    get endpointURI (): string {
        return `people/${this.personID}.json`;
    }

    static parse (pRawData: any): Person {
        let data = pRawData.person || pRawData;
        let obj = new Person();
        obj.personID = parseInt(data["id"]);
        obj.firstName = data["first-name"];
        obj.lastName = data["last-name"];
        obj.email = data["email-address"];
        obj.title = data["title"];
        obj.avatarUrl = data["avatar-url"];
        obj.companyID = parseInt(data["company-id"]);
        obj.isAdmin = data.administrator === true;
        obj.lastLogin = data["last-login"]; //TODO: moment
        return obj;
    }
}

/*
 * {
    "person": {
        "administrator": true,
        "pid": "",
        "site-owner": false,
        "twitter": "",
        "phone-number-home": "",
        "last-name": "User",
        "email-address": "d@demo1company.com",
        "profile": "",
        "userUUID": "",
        "private-notes": "",
        "user-name": "demo",
        "id": "999",
        "company-name": "Demo 1 Company",
        "last-changed-on": "2014-04-01T11:13:12Z",
        "phone-number-office": "",
        "deleted": false,
        "notes": "",
        "phone-number-mobile": "",
        "first-name": "Demo",
        "user-type": "account",
        "permissions": {
            "can-manage-people": true,
            "can-add-projects": true
        },
        "im-service": "",
        "address": {
            "zipcode": "",
            "countrycode": "",
            "state": "",
            "line1": "",
            "country": "",
            "line2": "",
            "city": ""
        },
        "im-handle": "",
        "created-at": "2013-10-21T18:01:39Z",
        "phone-number-office-ext": "",
        "company-id": "999",
        "has-access-to-new-projects": false,
        "phone-number-fax": "",
        "avatar-url": "http://demo1company.teamwork.com/images/avatar.jpg",
        "in-owner-company": "1",
        "last-login": "2014-04-01T11:32:12Z",
        "email-alt-1": "",
        "email-alt-2": "",
        "email-alt-3": "",
        "companyId": "999",
        "title": ""
    },
    "STATUS": "OK"
}
 */