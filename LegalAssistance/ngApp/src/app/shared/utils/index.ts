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

    public static isNotNullOrEmpty(str: string): boolean {
        return str !== '' && str !== null && str !== undefined;
    }
}