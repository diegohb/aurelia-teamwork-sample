import * as moment from "moment";

export class DateAgeValueConverter {

    toView(value, secondDateValue = new Date(), type = "past") {
        var date1 = moment(value);
        var date2 = moment(secondDateValue);

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