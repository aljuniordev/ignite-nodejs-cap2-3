import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export default class DayjsDateProvider implements IDateProvider {

    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const start_utc = this.convertToUTC(start_date);
        const end_utc = this.convertToUTC(end_date);
        return dayjs(end_utc).diff(start_utc, "hours");
    }

}
