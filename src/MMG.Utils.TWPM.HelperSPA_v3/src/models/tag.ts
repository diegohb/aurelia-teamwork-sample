
export class Tag {
    tagID: number;
    color: string;
    name: string;

    constructor () {

    }

    get endpointURI (): string {
        return `tags/${this.tagID}`;
    }

    static parse (pRawData: any): Tag {
        let data = pRawData.tag || pRawData;
        let obj = new Tag();
        obj.tagID = parseInt(data["id"]);
        obj.name = data["name"];
        obj.color = data["color"]; //e.g. "#b1da34"
        return obj;
    }
}

/*
 * {
    "tag": {
        "id": "999",
        "name": "Website",
        "color": "#ff0000"
    },
    "STATUS": "OK"
}
 */