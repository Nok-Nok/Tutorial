// Valid Parentheses
/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
 */

// This is a stack problem
// Time Complexity: O(n) where n is the length of the input str
// Space Complexity: O(n) where n is the length of the input str
function isValid(input) {
  // Initialize a stack
  const stack = [];
  // Intialize an object for opening
  const open = { '{': '}', '[': ']', '(': ')' };

  // Loop through the str
  for (const i in input) {
    const char = input[i];
    // If is it an openning, add to the stack
    if (char in open) stack.push(open[char]);
    // Else if it is a closing, see if it match with the most recent opening from the stack
    else if (char !== stack.pop()) return false;
  }
  return stack.length === 0;
}
