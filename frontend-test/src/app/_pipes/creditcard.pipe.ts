import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditcard'
})
export class CreditcardPipe implements PipeTransform {

  transform(value: string): string {
    const formatted = value.match(/[\s\S]{1,4}/g).join(' ');

    return formatted;
  }

}
