//NOTE: the reason this is not a typescript file is because I didn't spend enought time 
//trying to figure out how to get MomenJS to work correctly with TS compiler.
//could be a problem with TS compiler i'm using right now or it could be resharper.

import Moment from "moment";

export class DateFormatValueConverter {

    toView (value, format = "YYYY-MM-DD", defaultValue = "") {
        if (!value)
            return defaultValue;

        var momentDate = value instanceof Moment ? value : new Moment(value);
        return momentDate.format(format);
    }
}

export class DateAgeValueConverter {

    toView (value, secondDateValue = new Date(), type = "past") {
        var date1 = new Moment(value);
        var date2 = new Moment(secondDateValue);

        if (!date1.isValid())
            return "";

        if (!date2.isValid())
            throw new Error("Invalid second date provided with '" + secondDateValue + "'.");

        /*if (type !== "past" || type !== "future")
            throw new Error("Invalid value for type parameter. Must be 'past' or 'future'.");*/

        if (type === "past")
            return date2.to(date1);
        else if (type === "future")
            return date1.to(date2);
        else
            return "unknown";
    }
}