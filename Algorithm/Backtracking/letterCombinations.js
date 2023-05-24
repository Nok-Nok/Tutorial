//  Letter Combinations of a Phone Number

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

// Time Complexity: O(4^N)
// Space Complexity: O(N) where N is the lenght of digits

function letterCombinations(digits) {
  // Initalize an object for all options:
  const digitOptions = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };
  const result = [];
  if (!digits) return result;
  dfs(0, '');
  return result;

  function dfs(i, comb) {
    if (i === digits.length) return result.push(comb);
    for (const option of digitOptions[digits[i]]) {
      dfs(i + 1, comb + option);
    }
  }
}

// digits = '23';
// console.log(letterCombinations(digits));
