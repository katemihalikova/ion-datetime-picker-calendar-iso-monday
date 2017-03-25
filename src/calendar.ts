import {Calendar} from "ion-datetime-picker";

export default class ISOMondayCalendar implements Calendar {
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  private daysOfMonthCache: Calendar.DayMap[][] = [];

  public getMonthsOfYear() {
    return this.months;
  }

  public getDaysOfMonth(year: number, month: number): Calendar.DayMap {
    if (this.daysOfMonthCache[year] && this.daysOfMonthCache[year][month]) {
      return this.daysOfMonthCache[year][month];
    }
    const firstWeekDay = this.getFirstWeekDayOfMonth(year, month);
    const daysInMonth = this.getNumberOfDaysInMonth(year, month);
    let result: Calendar.DayMap = [[]];
    for (let day = 1, weekDay = 1; day <= daysInMonth; weekDay++) {
      if (weekDay > 7) {
        weekDay = 1;
        result.push([]);
      }
      if (day === 1 && weekDay < firstWeekDay) {
        result[result.length - 1].push(null);
      } else {
        result[result.length - 1].push(day);
        day++;
      }
    }
    result[result.length - 1] = result[result.length - 1].concat([null, null, null, null, null, null]).slice(0, 7);
    this.daysOfMonthCache[year] = this.daysOfMonthCache[year] || [];
    this.daysOfMonthCache[year][month] = result;
    return result;
  }

  public getLabelOfDayOfMonth(year: number, month: number, day: number): string {
    return String(day);
  }

  public getNumberOfDaysInMonth(year: number, month: number): number {
    let date = new Date();
    date.setFullYear(year, month, 0);
    return date.getDate();
  }

  public getWeekDays() {
    return this.weekDays;
  }

  protected getFirstWeekDayOfMonth(year: number, month: number): number {
    let date = new Date();
    date.setFullYear(year, month - 1, 1);
    return date.getDay() || 7;
  }
}
