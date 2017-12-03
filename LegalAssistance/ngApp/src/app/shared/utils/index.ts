export default class Utils {  
    //Format string 
    public static formatString(template: string, ...replacements: string[]): string {
        var args = replacements;

        return template.replace(/{(\d+)}/g, function(match:string, number:number) { 
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    }

    public static isNotNullOrEmpty(str: any): boolean {
        return str !== '' && str !== null && str !== undefined;
    }

    public static toRub(value: any): string {        
        let str = value.toString();        
        let lastNumber = parseInt(str.substring(str.length - 1));        
        let rubWord;

        if (lastNumber == 1) {
            rubWord = 'рубль';
        } else if ((value < 10 || value >= 20) && (lastNumber == 2 || lastNumber == 3 || lastNumber == 4)) {
            rubWord = 'рубля';
        } else {
            rubWord = 'рублей';
        }

        return `${value} ${rubWord}`;
    }

    public static buildSentence(...args: string[]) : string {
        var result = '';
        
        for (var i = 0; i < arguments.length; i++) {
            if (this.isNotNullOrEmpty(arguments[i])) {
                result += `${arguments[i]}, `;
            }
        }

        if (this.isNotNullOrEmpty(result)) {
            result = result.substring(0, result.length - 2);
        }

        return result;
    }

    public static toDate(date: Date) : string {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    public static getDatePeriod(startDate: Date, endDate: Date) : DatePeriodModel {
        // get total seconds between the times
        var delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;

        var model = new DatePeriodModel(days, hours, minutes);
        return model;
    }
}

class DatePeriodModel {
    days: number;
    hours: number;
    minutes: number;

    constructor(d: number, h: number, m: number) {
        this.days = d;
        this.hours = h;
        this.minutes = m;
    }
}