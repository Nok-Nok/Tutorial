/*

Given n pairs of parentheses, write a function to generate all combinations of
well-formed parentheses.

For example, given n = 2, a solution set is:

[
  "(())",
  "()()"
]

Given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

Given n = 0, a solution set is:

[
  ""
]

*/
// Space Complexity: As each recursion call, you can only either add a '(' or a ')'. Space complexity if 2n or O(n)
// Time Complexity: Since we have two choices for layer of the tree, and height of the tree is 2n (either add open or close parens) => Time complexity < 2^2n since we have a condition to stop recursion if condition doesn't meet. 
// This is backtracking Algo. Backtracking is an algorithmic technique whose goal is to use brute force to find all solutions to a problem. However, during the brute force, if we know we will get invalid result, we will not traverse through that branch. 
const generateParentheses = (n) => {
    // Initialize a result array
    const result = [];
    addOpen(n, n, '');
    return result;
    function addOpen(open, close, str) {
      // If there is still open, add open parenthesis
      // Recursively call addOpen
      if (open) {
        addOpen(open - 1, close, str + '(');
      }
      // If close > open, add close parenthesis
      // Recursively call addOpen
      if (close > open) {
        addOpen(open, close - 1, str + ')');
      }
      // If all close and open are 0
      // Add the str to result
      if (!close && !open) result.push(str);
    }
  };
  
  // console.log(generateParentheses(4));
  