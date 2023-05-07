/* 

Given a string that represents a Binary Number, write a function that converts this string into a decimal number. DO NOT use the native parseInt() method. 

For example: 

binToDec('0')   -> 0
binToDec('11')  -> 3
binToDec('100') -> 4
binToDec('101') -> 5
binToDec('0101') -> 5

For more information on how to read binary, check out this article: 
https://m.wikihow.com/Read-Binary

*/

function binToDec(binString) {
  // let product
  let prod = 1;
  let result = 0;
  // Loop from the end to start of the string
  for (let i = binString.length - 1; i >= 0; i--) {
    result += prod * binString[i];
    prod *= 2;
  }
  return result;
}
// console.log(binToDec('0'));
// console.log(binToDec('11'));
// console.log(binToDec('100'));
// console.log(binToDec('101'));
// console.log(binToDec('0101'));
