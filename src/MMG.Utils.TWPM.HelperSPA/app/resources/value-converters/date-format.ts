import * as moment from "moment";

export class DateFormatValueConverter {

    toView (value, format = "YYYY-MM-DD", defaultValue = "") {
        if (!value)
            return defaultValue;

        let momentDate = value instanceof moment ? value : moment(value);
        return momentDate.format(format);
    }
}