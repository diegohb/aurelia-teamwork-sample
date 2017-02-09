export class Company {
    companyID: number;
    name: string;

    constructor () {

    }

    get endpointURI (): string {
        return `companies/${this.companyID}.json`;
    }

    static parse (pRawData: any): Company {
        let data = pRawData.company || pRawData;
        let obj = new Company();
        obj.companyID = parseInt(data.id);
        obj.name = data.name;
        return obj;
    }
}

/*
 * {
    "company": {
        "state": "State",
        "name": "Demo 2 Company",
        "address_two": "Address Line 2",
        "email_one": "",
        "country": "Ireland",
        "isowner": "0",
        "email_three": "",
        "contacts": "0",
        "industry": "",
        "logo-URL": "",
        "address_one": "Address Line 1",
        "website": "http://demo2company.com",
        "cid": "",
        "email_two": "",
        "accounts": "0",
        "phone": "",
        "company_name_url": "999-demo-2-company",
        "countrycode": "IE",
        "can_see_private": false,
        "zip": "",
        "id": "999",
        "city": "City",
        "fax": ""
    },
    "STATUS": "OK"
}
 */