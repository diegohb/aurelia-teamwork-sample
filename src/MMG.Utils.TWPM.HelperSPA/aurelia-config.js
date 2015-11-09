import {LogManager} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";
import {$} from "bower_components/jquery/dist/jquery.js";

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia) {
    $("#pleaseWaitDialog").modal();

    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .history()
        .router()
        .eventAggregator();
      /*.plugin("custom-plugin");*/

    aurelia.start().then(a => a.setRoot("app", document.body))
        .then(p => { $("#pleaseWaitDialog").modal("hide"); });
}