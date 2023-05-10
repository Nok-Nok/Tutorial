// Evaluate Reverse Polish Notation
/**
 * You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.
 

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 

Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].
 */

// Space complexity: O(n) where n is the maximum numeric value in tokens
// Time complexity: O(m) where m is the length of tokens
function evalRPN1(tokens) {
  const numStack = [];
  const operation = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => Math.trunc(num1 / num2),
  };
  // Traverse through the tokens array
  for (const token of tokens) {
    const num = Number(token);
    // If value is number, push to number stack
    if (!isNaN(num)) {
      numStack.push(num);
    }

    // Else: handle the operation
    else {
      // Pop out the two most recent elements
      const num1 = numStack.pop();
      const num2 = numStack.pop();
      // Push the new result into stack
      numStack.push(operation[token](num2, num1));
    }
  }
  return numStack[0];
}

// Another approach:
function evalRPN(tokens) {
  const numStack = [];
  // Traverse through the tokens array
  for (const token of tokens) {
    switch (token) {
      case '+':
        numStack.push(numStack.pop() + numStack.pop());
        break;
      case '-':
        numStack.push(-numStack.pop() + numStack.pop());
        break;
      case '*':
        numStack.push(numStack.pop() * numStack.pop());
        break;
      case '/':
        numStack.push(Math.trunc((1 / numStack.pop()) * numStack.pop()));
        break;
      default:
        numStack.push(Number(token));
    }
  }
  return numStack[0];
}

// tokens = ['2', '1', '+', '3', '*'];
// console.log(evalRPN(tokens));
// tokens = ['4', '13', '5', '/', '+'];
// console.log(evalRPN(tokens));

// tokens = ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'];
// console.log(evalRPN(tokens));
// tokens = ['3', '11', '+', '5', '-'];
// console.log(evalRPN(tokens));
