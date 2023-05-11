// Generate Parentheses

/**
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
 */

function generateParenthesis(n) {
  // Initialize a result array
  const result = [];
  addParens(n, n, '');
  return result;
  // Recursive function for adding open and close parens
  function addParens(open, close, str) {
    // Base case: if no open or close, push str to result
    if (!open && !close) return result.push(str);

    // Option 1: if open>0, add '('
    if (open) {
      // Recursively call addParens with update open and str
      addParens(open - 1, close, str + '(');
    }

    // Option 2: if close>open, add ')'
    if (close > open) {
      // Recursively call addParens with update close and str
      addParens(open, close - 1, str + ')');
    }
  }
}
