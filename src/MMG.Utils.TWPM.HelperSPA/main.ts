///<reference path="typings/aurelia/framework@0.17.0/aurelia-framework.d.ts"/>

import "bootstrap";
import {LogManager} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure (aurelia) {
    //$("#pleaseWaitDialog").modal();

    aurelia.use
        .defaultBindingLanguage()
        /*.developmentLogging()*/
        .defaultResources()
        .history()
        .router()
        .eventAggregator();
    /*.plugin("custom-plugin");*/

    aurelia.start().then(app => app.setRoot("app"));
}