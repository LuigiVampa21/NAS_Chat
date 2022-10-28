import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})

export class ShortenPipe implements PipeTransform {
    transform(value: string, maxLength = 20): string {
        if(value.length <= 20){
             return value
            };
        return value.substring(0, maxLength) + '...';
    }
}
