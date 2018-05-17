import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditcard'
})
export class CreditcardPipe implements PipeTransform {

  transform(value: number, lastNumbers): string {
    const formatted = value.toString().match(/[\s\S]{1,4}/g).join(' ');

    if (lastNumbers) {
      return value.toString().slice(-4);
    }

    return formatted;
  }

}
