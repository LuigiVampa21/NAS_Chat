import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {


  transform(value: Date): string {
    const today = (first:Date, second:Date):boolean => {
      if(
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
        ) return true;
         return false;
    }
    const t = new Date(value)

  if(today(new Date(), t)){
    return `${t.getHours()}:${t.getMinutes()}`
  }
  return `${t.getMonth()}/${t.getDay()}/${t.getFullYear()}`
      }
}
