// Regular Expression Matching

/**
 * Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
 

Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const cache = new Array(s.length)
    .fill(0)
    .map((e) => new Array(p.length).fill(-1));
  return dfs(0, 0);
  function dfs(iS, iP) {
    // If reach end of S & P, return true
    if (iS === s.length && iP === p.length) return true;
    // If reach end of P but not S, return false
    if (iP === p.length) return false;
    // If reach of S, evalute the condition for removing *
    if (iS === s.length)
      return p[iP] === '*' || p[iP + 1] === '*' ? dfs(iS, iP + 1) : false;
    // If in cache, return cache value
    if (cache[iS][iP] != -1) return cache[iS][iP];

    // Recursive case:
    // If curS match curP or curP is '.', move next s & p
    let matchCurChar = false;
    if (s[iS] === p[iP] || p[iP] === '.') {
      // console.log('here')
      matchCurChar = dfs(iS + 1, iP + 1);
    }
    // If curP is '*', update prevChar
    // If prevChar match, => move next s & p
    // If prevChar not match => move next s
    let matchCurWild = false;
    if (p[iP] === '*') {
      const prevChar = p[iP - 1];
      const match =
        prevChar === '.' || prevChar === s[iS] ? dfs(iS + 1, iP) : false;
      const skip = dfs(iS, iP + 1);
      matchCurWild = match || skip;
    }
    // If the next char is a wild char, we can obmit
    let matchNextWild = false;
    if (p[iP + 1] === '*') matchNextWild = dfs(iS, iP + 2);
    return (cache[iS][iP] = matchCurChar || matchCurWild || matchNextWild);
  }
};
(s = 'aa'), (p = 'a');
console.log(isMatch(s, p));
(s = 'aa'), (p = '****..***');
console.log(isMatch(s, p));
(s = 'aab'), (p = 'c*a*b');
console.log(isMatch(s, p));
(s = 'mississippi'), (p = 'mis*is*.p*.');
console.log(isMatch(s, p));
(s = 'aaa'), (p = 'ab*ac*a');
console.log(isMatch(s, p));
