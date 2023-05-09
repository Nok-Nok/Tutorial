/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' const wow = { yo: thisIsAwesome() }'); // true
 * balancedParens(' const newton = () => { telescopes.areSicc(); '); // false
 *
 *
 */
// This is a stack problem
// Time Complexity: O(n) where n is the length of the input str
// Space Complexity: O(n) where n is the length of the input str
const balancedParens = (input) => {
  // Initialize a stack
  const stack = [];
  // Intialize an object for opening
  const open = { '{': '}', '[': ']', '(': ')' };
  const close = new Set([']', ')', '}']);
  // Loop through the str
  for (const i in input) {
    const char = input[i];
    // If is it an openning, add to the stack
    if (char in open) stack.push(open[char]);
    // Else if it is a closing, see if it match with the most recent opening from the stack
    else if (close.has(char)) {
      if (char !== stack.pop()) return false;
    }
  }
  return stack.length === 0;
};
