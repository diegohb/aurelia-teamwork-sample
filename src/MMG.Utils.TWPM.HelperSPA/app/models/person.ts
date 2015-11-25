export class Person {
    personID: number;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    title: string;

    constructor (data: any) {
        this.personID = data["id"];
        this.firstName = data["first-name"];
        this.lastName = data["last-name"];
        this.email = data["email-address"];
        this.title = data["title"];
        this.avatarUrl = data["avatar-url"];
    }


}

/*
  * {
        "id": "999", // integer
        "user-type": "account", // 'acccount' or 'contact' default:'account'
        "first-name": "Demo",
        "last-name": "User",
        "title": "",
        "email-address": "me@demo1company.com",
        "im-handle": "",
        "im-service": "",
        "notes": "",
        "phone-number-office": "",
        "phone-number-office-ext": "",
        "phone-number-mobile": "",
        "phone-number-home": "",
        "phone-number-fax": "",     
        "last-login": "2014-04-01T11:32:12Z", // datetime
        "company-id": "999", // integer
        "company-name": "Demo 1 Company",
        "in-owner-company": "1", // boolean
        "created-at": "2013-10-21T18:01:39Z", // datetime
        "last-changed-on": "2014-03-31T10:23:46Z", // datetime
        "avatar-url": "https://s3.amazonaws.com/TWFiles/2/users/999.avatar",
        "user-name": "test",
        "deleted": false, // boolean
        "has-access-to-new-projects": false, // boolean
        "administrator": true, // boolean
        "permissions": {
            "can-manage-people": true, // boolean
            "can-add-projects": true // boolean
        }
    }
  */