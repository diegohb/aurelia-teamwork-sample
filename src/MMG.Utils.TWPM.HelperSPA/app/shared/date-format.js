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