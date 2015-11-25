
export class Tag {
    ID: number;
    color: string;
    name: string;

    constructor (data: any) {
        this.ID = data["id"];
        this.name = data["name"];
        this.color = data["color"]; //e.g. "#b1da34"
    }

}