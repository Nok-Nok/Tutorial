// 439. Ternary Expression Parser

/**
 * Given a string expression representing arbitrarily nested ternary expressions, evaluate the expression, and return the result of it.

You can always assume that the given expression is valid and only contains digits, '?', ':', 'T', and 'F' where 'T' is true and 'F' is false. All the numbers in the expression are one-digit numbers (i.e., in the range [0, 9]).

The conditional expressions group right-to-left (as usual in most languages), and the result of the expression will always evaluate to either a digit, 'T' or 'F'.

 

Example 1:

Input: expression = "T?2:3"
Output: "2"
Explanation: If true, then result is 2; otherwise result is 3.
Example 2:

Input: expression = "F?1:T?4:5"
Output: "4"
Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
"(F ? 1 : (T ? 4 : 5))" --> "(F ? 1 : 4)" --> "4"
or "(F ? 1 : (T ? 4 : 5))" --> "(T ? 4 : 5)" --> "4"
Example 3:

Input: expression = "T?T?F:5:3"
Output: "F"
Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
"(T ? (T ? F : 5) : 3)" --> "(T ? F : 3)" --> "F"
"(T ? (T ? F : 5) : 3)" --> "(T ? F : 5)" --> "F"
 

Constraints:

5 <= expression.length <= 104
expression consists of digits, 'T', 'F', '?', and ':'.
It is guaranteed that expression is a valid ternary expression and that each number is a one-digit number.
 */

/**
 * @param {string} expression
 * @return {string}
 */
//Thinking of using recursion and sliding window
// This also a stack problem ....

// Time Complexity: Searching through the string for answer + search through the string again for find the ':' => O(n^2)
// Space Complexity: Using recursion => Search through the string => Worst case is if we need to search for every chare => O(n)
var parseTernary = function (expression) {
  return helper(0, expression.length - 1);
  function helper(start, end) {
    // Base case: down to 1 char
    // Return the char
    if (start === end) return expression[start];

    // Recursive case:
    // Find the corrsponding ':'
    let count = 1;
    let splitPos = start + 1; // get the position of ':'
    while (count) {
      splitPos++;
      if (expression[splitPos] === '?') count++;
      else if (expression[splitPos] === ':') count--;
    }
    // If current char is T, invoke on for the left
    if (expression[start] === 'T') return helper(start + 2, splitPos - 1);
    // Else, invoke on for the right
    else return helper(splitPos + 1, end);
  }
};

// Second Approach, searching backware and use stack
// Time Complexity: O(N) since we only evaluate each char once
// Space Complexity: O(N) since we are using the stack to save char
var parseTernary = function (expression) {
  // Initialize stack
  const stack = [];
  // Search backward
  for (let i = expression.length - 1; i >= 0; i--) {
    // If current char is ?, evaluate the stack
    if (expression[i] === '?') {
      const onTrue = stack.pop();
      const onFalse = stack.pop();
      expression[i - 1] === 'T' ? stack.push(onTrue) : stack.push(onFalse);
      // Need to move i to the left one more since we have evaluated expression[i-1] is true for false for updating the stack
      i--;
    }
    // Else, push the value to stack
    else if (expression[i] != ':') stack.push(expression[i]);
  }
  return stack.pop();
};
expression = 'T?2:3';
console.log(parseTernary(expression));
expression = 'F?1:T?4:5';
console.log(parseTernary(expression));
expression = 'T?T?F:5:3';
console.log(parseTernary(expression));
