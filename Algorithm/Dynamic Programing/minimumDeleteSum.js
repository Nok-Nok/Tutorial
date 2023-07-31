// 712. Minimum ASCII Delete Sum for Two Strings

/**
 * Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.

 

Example 1:

Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
Deleting "t" from "eat" adds 116 to the sum.
At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
Example 2:

Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d] + 101[e] + 101[e] to the sum.
Deleting "e" from "leet" adds 101[e] to the sum.
At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.
 

Constraints:

1 <= s1.length, s2.length <= 1000
s1 and s2 consist of lowercase English letters.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
// Top Down w/ memoization
// Space Complexity: O(len1 * len 2) for caching + O(max(len1, len2)) for recursion stack
// Time Complexity: O(len1 * len2)
var minimumDeleteSum = function (s1, s2) {
  const cache = {};
  return dfs(0, 0);
  function dfs(i1, i2) {
    // Base case: if in cache, return cache
    const pos = i1 + ',' + i2;
    if (pos in cache) return cache[pos];
    // Base case: reach the end s1 or s2
    if (i1 === s1.length || i2 === s2.length) {
      let tot1 = 0;
      for (let i = i1; i < s1.length; i++) tot1 += s1.charCodeAt(i);
      let tot2 = 0;
      for (let i = i2; i < s2.length; i++) tot2 += s2.charCodeAt(i);
      return (cache[pos] = tot1 + tot2);
    }
    // Recursive case:
    // if match, move to next i1, i2
    if (s1[i1] === s2[i2]) cache[pos] = dfs(i1 + 1, i2 + 1);
    // if not match, min of move to next i1 || next i2
    else
      cache[pos] = Math.min(
        s1.charCodeAt(i1) + dfs(i1 + 1, i2),
        s2.charCodeAt(i2) + dfs(i1, i2 + 1)
      );

    return cache[pos];
  }
};

// 2D-DP array
// Space Complexity: O(len1 * len 2) for dp array
// Time Complexity: O(len1 * len2)
var minimumDeleteSum = function (s1, s2) {
  const [len1, len2] = [s1.length, s2.length];
  // Intiailize a Dp array, fill w/ infinity
  const dp = new Array(len1 + 1)
    .fill(0)
    .map((e) => new Array(len2 + 1).fill(Infinity));
  // Initialize condition: if reach end of s1 or s2, sum would be 0
  for (let i1 = len1; i1 >= 0; i1--) {
    for (let i2 = len2; i2 >= 0; i2--) {
      if (i1 === len1 && i2 === len2) dp[i1][i2] = 0;
      // if Match, move to next i1, i2
      else if (s1[i1] === s2[i2]) dp[i1][i2] = dp[i1 + 1][i2 + 1];
      // if not match, min of move to next i1 || next i2
      else
        dp[i1][i2] = Math.min(
          s1[i1] ? s1.charCodeAt(i1) + dp[i1 + 1][i2] : Infinity,
          s2[i2] ? s2.charCodeAt(i2) + dp[i1][i2 + 1] : Infinity
        );
    }
  }
  console.table(dp);
  return dp[0][0];
};

// 1D DP array
// Space Complexity: O(min(len1,len2)) for dp array
// Time Complexity: O(len1 * len2)
var minimumDeleteSum = function (s1, s2) {
  const [len1, len2] = [s1.length, s2.length];
  // Ensure to get min len for dp array
  if (len1 < len2) return minimumDeleteSum(s2, s1);
  // Intiailize a Dp array, fill w/ infinity
  let dp = new Array(len2 + 1).fill(0);
  let newDp = new Array(len2 + 1).fill(0);
  // Intial condition: no char left in s1 and s2 => value 0
  for (let i2 = len2 - 1; i2 >= 0; i2--) {
    dp[i2] = s2.charCodeAt(i2) + dp[i2 + 1];
  }

  for (let i1 = len1 - 1; i1 >= 0; i1--) {
    for (let i2 = len2; i2 >= 0; i2--) {
      // if Match, move to next i1, i2
      if (s1[i1] === s2[i2]) newDp[i2] = dp[i2 + 1];
      // if not match, min of move to next i1 || next i2
      else
        newDp[i2] = Math.min(
          s1.charCodeAt(i1) + dp[i2],
          s2[i2] ? s2.charCodeAt(i2) + newDp[i2 + 1] : Infinity
        );
    }
    [dp, newDp] = [newDp, dp];
  }
  // console.table(dp);
  return dp[0];
};

(s1 = 'b'), (s2 = 'ab');
console.log(minimumDeleteSum(s1, s2));
(s1 = 'sea'), (s2 = 'eat');
console.log(minimumDeleteSum(s1, s2));
(s1 = 'delete'), (s2 = 'leet');
console.log(minimumDeleteSum(s1, s2));
