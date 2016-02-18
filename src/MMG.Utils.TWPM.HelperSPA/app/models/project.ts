import {Company} from "./company";
import * as moment from "moment";

export class Project {
    projectID: number;
    name: string;
    lastModified: any;
    dateCreated: any;
    endDate: any;
    company: Company;

    constructor () {

    }

    get endpointURI (): string {
        return `projects/${this.projectID}.json`;
    }

    static parse (pRawData: any): Project {
        let data = pRawData.project || pRawData;
        let obj = new Project();
        obj.projectID = parseInt(data.id);
        obj.name = data.name;
        obj.lastModified = data["last-changed-on"];
        obj.dateCreated = moment.constructor(data["created-on"]);
        obj.endDate = moment.constructor(data.endDate);
        if (data.company) {
            obj.company = Company.parse(data.company);
        }
        return obj;
    }
}

/*
 * {
    "STATUS": "OK",
    "projects": [
        {
            "company": {
                "name": "Demo 1 Company",
                "is-owner": "1",
                "id": "999"
            },
            "starred": true,
            "name": "demo",
            "show-announcement": false,
            "announcement": "",
            "description": "A demo project",
            "status": "active",
            "isProjectAdmin": true,
            "created-on": "2014-03-28T15:24:22Z",
            "category": {
                "name": "",
                "id": ""
            },
            "start-page": "projectoverview",
            "startDate": "",
            "logo": "http://demo1company.teamwork.com/images/logo.jpg",
            "notifyeveryone": false,
            "id": "999",
            "last-changed-on": "2014-04-01T14:29:32Z",
            "endDate": "",
            "harvest-timers-enabled":"true"
        }
    ]
}
 */