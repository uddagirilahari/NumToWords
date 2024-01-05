import { Pipe, PipeTransform } from '@angular/core';
import * as numberToWords from 'number-to-words';
@Pipe({
  name: 'numToWord'
})
export class NumToWordPipe implements PipeTransform {

//   transform(value: number): string {
//     if (value >= 0 && value <= 1000000) {
//       return numberToWords.toWords(value);
//     } else {
//       return 'Invalid Number';
//     }
//   }
// }

  private units: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  private teens: string[] = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private tens: string[] = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  private convertLessThanOneThousand(num: number): string {
    if (num === 0) {
      return '';
    } else if (num < 10) {
      return this.units[num];
    } else if (num < 20) {
      return this.teens[num - 10];
    } else if (num < 100) {
      const digit = num % 10;
      return this.tens[Math.floor(num / 10)] + (digit !== 0 ? ' ' + this.units[digit] : '');
    } else {
      const digit = num % 10;
      const tensDigit = Math.floor((num % 100) / 10);
  
      return this.units[Math.floor(num / 100)] + ' Hundred' +
             (tensDigit !== 0 ? ' ' + this.tens[tensDigit] : '') +
             (digit !== 0 ? ' ' + this.units[digit] : '');
    }
  }

  transform(value: number): string {
    if (value >= 0 && value <= 1000000) {
      const lakh = Math.floor(value / 100000);
      const thousand = Math.floor((value % 100000) / 1000);
      const remainder = value % 1000;

      let result = '';

      if (lakh > 0) {
        // if(lakh===1)
          result += this.convertLessThanOneThousand(lakh) + ' lakh ';
        // else
        // result += this.convertLessThanOneThousand(lakh) + ' lakhs ';

      }

      if (thousand > 0) {
        result += this.convertLessThanOneThousand(thousand) + ' Thousand ';
      }

      if (remainder > 0) {
        result += this.convertLessThanOneThousand(remainder);
      }

      return result.trim();
    } else {
      return 'Invalid Number';
    }
  }
}
