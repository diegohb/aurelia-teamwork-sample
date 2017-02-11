import {FrameworkConfiguration} from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.globalResources(["./elements/nav-lv2.html", "./value-converters/date-format.js", "./value-converters/date-age"]);
}
