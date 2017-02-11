import "bootstrap";
import {LogManager, Aurelia} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia: Aurelia) {
    //$("#pleaseWaitDialog").modal();

    aurelia.use
        .defaultBindingLanguage()
        /*.developmentLogging()*/
        .defaultResources()
        .history()
        .router()
        .eventAggregator()
        .feature("app/resources");
    /*.plugin("custom-plugin");*/

    aurelia.start().then(app => app.setRoot("app/app"));
}