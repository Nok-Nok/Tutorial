//  Distinct Subsequences

/**
 * Given two strings s and t, return the number of distinct 
subsequences
 of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

 

Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
 

Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.

 */

// TopDown DP with memoization
// Time Complexity: O(s*t) where s and t are length of the strings
// Space Complexity: O(s*t) where s and t are length of the strings
function numDistinct(s, t) {
  const visited = {};
  return dfs(0, 0, s.length, t.length);

  function dfs(iS, iT, lenS, lenT) {
    // Base case:
    // if end of T, we got 1 combination, return 1
    if (iT === lenT) return 1;
    // If end of S but not match, return 0
    if (iS === lenS) return 0;
    // If position (s,t) has beeen visited, return the cache value
    const key = iS + ',' + iT;
    if (key in visited) return visited[key];

    // Recursive case:
    // If char in s not match with char in t

    // Recursive case:
    // Option1: add char from s only if char match
    const add = s[iS] === t[iT] ? dfs(iS + 1, iT + 1, lenS, lenT) : 0;
    // Option2: not add the char
    const notAdd = dfs(iS + 1, iT, lenS, lenT);
    return (visited[key] = add + notAdd);
  }
}

// Try 2D DP Approach
// Time Complexity: O(s*t) where s and t are length of the input strings
// Space Complexity: O(t) where t is the length of the string t
function numDistinct(s, t) {
  const lenS = s.length;
  const lenT = t.length;
  // Initialize 2D DP
  let nextS = new Array(lenT + 1).fill(0);
  nextS[lenT] = 1;
  for (let iS = lenS - 1; iS >= 0; iS--) {
    // Track the numDistinct of combination of the current substring iS -> end
    const curS = new Array(lenT + 1).fill(0);
    curS[lenT] = 1;
    for (let iT = lenT - 1; iT >= 0; iT--) {
      /**
       * Option 1: If iS match iT, use iS => increase iS & iT
       * Option 2: Not use iS => increase iS only, keep iT
       */
      curS[iT] = (s[iS] === t[iT] ? nextS[iT + 1] : 0) + nextS[iT];
    }
    // Reassign
    nextS = curS;
  }
  return nextS[0];
}

// (s = 'rabbbit'), (t = 'rabbit');
// console.log(numDistinct(s, t));
// (s = 'babgbag'), (t = 'bag');
// console.log(numDistinct(s, t));
