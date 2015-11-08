import {sayHello} from "main/twpm-svc";

export class App {
    constructor() {
        this.name = "Diego";
    }

    activate() {
        sayHello();
    }

    changeName() {
        this.name = "Bill";
    }
}