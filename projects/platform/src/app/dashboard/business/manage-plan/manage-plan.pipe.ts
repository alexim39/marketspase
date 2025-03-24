import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TransactionFilter',
  standalone: true // Make the pipe standalone
})
export class TransactionFilterPipe implements PipeTransform {

  transform(transaction: any[], filterText: string): any[] {
    if (!transaction || !filterText) {
      return transaction;
    }
    return transaction.filter(transaction => transaction.reference.toLowerCase().includes(filterText.toLowerCase()));
  }

}