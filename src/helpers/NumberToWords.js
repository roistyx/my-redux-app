// Needs testing and/or move to backend to use library
import React from 'react';

class NumberToWords extends React.Component {
  convertToWords = (num) => {
    num = parseInt(num.replace(/[, $]+/g, ''), 10);

    const a = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    const g = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    const rem = (num) => num % 1e3;

    const toWords = (num, idx = 0) => {
      let str = '';
      let r = rem(num);
      if (num > 999)
        str = toWords(Math.floor(num / 1e3), idx + 1) + ' ';
      if (r > 99) str += a[Math.floor(r / 100)] + ' Hundred ';
      r %= 100;
      if (r > 19) str += b[Math.floor(r / 10)] + ' ';
      if (r > 0) str += a[r % 10];
      return str.trim() + (idx && str.trim() ? ' ' + g[idx] : '');
    };

    return toWords(num).trim();
  };

  render() {
    const { number } = this.props;
    return <span>{this.convertToWords(number)}</span>;
  }
}

export default NumberToWords;
