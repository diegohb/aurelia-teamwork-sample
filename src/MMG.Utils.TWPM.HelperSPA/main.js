import {LogManager} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";
import $ from "bootstrap";

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia) {
    $("#pleaseWaitDialog").modal();

    aurelia.use
        .defaultBindingLanguage()
        .developmentLogging()
        .defaultResources()
        .history()
        .router()
        .eventAggregator();
      /*.plugin("custom-plugin");*/

    aurelia.start().then(a => a.setRoot("app/app", document.body))
        .then(p => { $("#pleaseWaitDialog").modal("hide"); });
}