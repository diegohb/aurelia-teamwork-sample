import * as moment from "moment";

export class DateFormatValueConverter {
    toView (value, format = "YYYY-MM-DD") {
        var momentDate = value instanceof moment.constructor ? value : moment.constructor(value);
        return momentDate.format(format);
    }
}