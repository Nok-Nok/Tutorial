// Longest Valid Parentheses

/**
 * Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses 
substring
.

 

Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const dp = new Array(s.length).fill(false);
  const open = []; //An array that is used to stack open position:
  for (let i = 0; i < dp.length; i++) {
    if (s[i] === '(') open.push(i);
    else if (open.length) {
      dp[i] = true;
      dp[open.pop()] = true;
    }
    console.log(open);
  }
  console.log(dp);
  let max = 0;
  let l = 0;
  while (l < dp.length && !dp[l]) l++;
  let r = l;
  while (r < dp.length) {
    // Update max if we found a match
    if (dp[r]) {
      max = Math.max(max, r - l + 1);
      r++;
    } else {
      l++;
      while (l < dp.length && !dp[l]) l++;
      r = l;
    }
  }
  return max;
};

// Top Down DP with 1D array
var longestValidParentheses = function (s) {
  const dp = new Array(s.length).fill(0);
  let openStack = 0;
  let max = 0;
  // Loop throuhg the string
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') openStack++;
    else if (s[i] === ')' && openStack) {
      const curLength = dp[i - 1] + 2;
      const prevLength = dp[i - curLength] ?? 0;
      dp[i] = curLength + prevLength;
      openStack--;
      max = Math.max(max, dp[i]);
    }
  }
  // console.log(dp);
  return max;
};
// Bottom up DP with 1D array
var longestValidParentheses = function (s) {
  const dp = new Array(s.length + 1).fill(0);
  let closeStack = 0;
  let max = 0;
  // Loop throuhg the string
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') closeStack++;
    else if (s[i] === '(' && closeStack) {
      // Find current portion length
      const curLength = dp[i + 1] + 2;
      // Find there is any previous valid portion before the current one
      const prevLength = dp[i + curLength];
      dp[i] = curLength + prevLength;
      closeStack--;
      max = Math.max(max, dp[i]);
    }
  }
  // console.log(dp);
  return max;
};
// s = '((()(((((((((((())()';
s = '()(())()(())';
s = ')()())';
console.log(longestValidParentheses(s));
