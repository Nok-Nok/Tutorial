// 17. Letter Combinations of a Phone Number

/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
 */

function letterCombinations1(digits: string): string[] {
  if (!digits) return [];
  const numToLet: Record<string, string> = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  return dfs(0);

  function dfs(start: number): string[] {
    // If reach the require number of digits, return array of empty string
    if (start === digits.length) return [''];

    // Recursive case:
    const result: string[] = [];
    // Obtain the corresponding digit
    const dig = digits[start];
    // Loop through all letters that correspond w/ the digit
    for (let j = 0; j < numToLet[dig].length; j++) {
      // Loop through the digit from the start
      // Obtain combs of subsquent digits
      const combs = dfs(start + 1);
      // Obtain the letter
      const letter: string = numToLet[dig][j];
      // Loop through the combs
      for (const comb of combs) {
        result.push(letter + comb);
      }
    }
    return result;
  }
}
function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const numToLet: Record<string, string> = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  const result: string[] = [];
  dfs('');
  return result;

  function dfs(comb: string): undefined | number {
    // Base case: If reach the require number of digits, push string to result
    if (comb.length === digits.length) return result.push(comb);
    // Recursive case:
    // Obtain the next corresponding digit
    const dig = digits[comb.length];
    // Loop through all letters that correspond w/ the digit
    for (const letter of numToLet[dig]) {
      // Obtain combs of subsquent digits
      dfs(comb + letter);
    }
  }
}
const digits = '32';
console.log(letterCombinations(digits));
