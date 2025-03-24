import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerOfTen'
})
export class PowerOfTenPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) return '0';
    if (value < 1000000) return value.toString();
    const exponent = Math.floor(Math.log10(value));
    return `10^${exponent}`;
  }
}