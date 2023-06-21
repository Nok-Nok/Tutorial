function solution(number) {
  // convert the number to a roman numeral
  const symbols = {
    1000: 'M',
    500: 'D',
    100: 'C',
    50: 'L',
    10: 'X',
    5: 'V',
    1: 'I',
  };

  let str = '';
  let digit = 1;
  while (number) {
    let numChar = number % 10;
    let chunk;
    if (numChar === 9) {
      chunk = symbols[digit] + symbols[10 * digit];
    } else if (numChar >= 5) {
      chunk = symbols[5 * digit] + symbols[digit].repeat(numChar - 5);
    } else if (numChar === 4) chunk = symbols[digit] + symbols[5 * digit];
    else {
      chunk = symbols[digit].repeat(numChar);
    }
    number = Math.floor(number / 10);
    digit *= 10;
    str = chunk + str;
  }
  return str;
}

console.log(solution(2008));
