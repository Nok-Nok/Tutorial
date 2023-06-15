// Valid Parenthesis String

/**
 * Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true
 

Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.
 */
/**
 * @param {string} s
 * @return {boolean}
 */
// Do 2 loops, then figure later
// Time Complexity: O(n)
// Space Complexity: O(1)
var checkValidString = function (s) {
  let open = 0;
  let wildOpen = 0;
  for (const char of s) {
    if (char === '(') open++;
    else if (char === '*') wildOpen++;
    else {
      if (open) open--;
      else if (--wildOpen < 0) return false;
    }
  }
  if (open > wildOpen) return false;

  let close = 0;
  let wildClose = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];
    if (char === ')') close++;
    else if (char === '*') wildClose++;
    else {
      if (close) close--;
      else if (--wildClose < 0) return false;
    }
  }
  return close <= wildClose;
};

// Time Complexity: O(n)
// Space Complexity: O(1)
var checkValidString = function (s) {
  // Initialize the range for open paranthenses
  let openMin = 0;
  let openMax = 0;
  for (const char of s) {
    // For open, increase min & max
    if (char === '(') {
      openMin++, openMax++;
    }
    // For close, decrease min & max
    else if (char === ')') {
      // Only reduce min if we don't go below zero
      if (openMin) openMin--;
      // Max Open can not go below zero, so we return false
      if (--openMax < 0) return false;
    }
    // For wild card: turn open or turn close
    else {
      // Only turn wild card into a close, if there is still open
      if (openMin) openMin--;
      // Turn wild card to open, increase the max
      openMax++;
    }
  }
  return openMin === 0;
};
s = '()';
console.log(checkValidString(s));
s = '(*)';
console.log(checkValidString(s));
s = '(*))';
console.log(checkValidString(s));
s =
  '((((()(()()()*()(((((*)()*(**(())))))(())()())(((())())())))))))(((((())*)))()))(()((*()*(*)))(*)()';
console.log(checkValidString(s));
s = '(((((*(*********((*(';
console.log(checkValidString(s));
s = '(((((*((((*********)))((';
console.log(checkValidString(s));
