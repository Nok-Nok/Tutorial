// Interleaving String

/**
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
substrings
 respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.
 

Follow up: Could you solve it using only O(s2.length) additional memory space?
 */

// DP Approach (Top Down with memoization)
// Space Complexity: O(len1*len2) for the memoization
// Time Complexity: O(len1*pen2) for traversing through all possible combination of s1 & s2
function isInterleave(s1, s2, s3) {
  // Get the size of the DP
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  // Edge case if the sum string length not match
  if (len1 + len2 != len3) return false;
  // Intialize 2D DP - Assume we can't make the s3 using s1 and s2
  const cache = new Set();
  return dfs(0, 0, 0);

  // Perfrom DFS
  function dfs(i1, i2, i3) {
    // If end of s3, return true
    if (i3 === len3) return true;
    // If in cache, return
    const pos = i1 + ',' + i2;
    if (cache.has(pos)) return false;
    // Update cache
    cache.add(pos);
    // Conditional: if match with s1, traverse s1
    const useS1 = s1[i1] === s3[i3] ? dfs(i1 + 1, i2, i3 + 1) : false;
    // Conditional: if match with s2, traverse s2
    const useS2 =
      useS1 || (s2[i2] === s3[i3] ? dfs(i1, i2 + 1, i3 + 1) : false);
    return useS1 || useS2;
  }
}

// Can I do it with just O(len2) space compleixty

// Let do 2D DP first then we can reduce
// Time Complexity: O(s1*s2)
// Space Complexity: O(s1*s2)
function isInterleave(s1, s2, s3) {
  // Get the size of the DP
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  // Edge case if the sum string length not match
  if (len1 + len2 != len3) return false;

  let dp = new Array(len2 + 1)
    .fill(false)
    .map((e) => new Array(len1 + 1).fill(false));
  dp[len2][len1] = true;

  for (let i2 = len2; i2 >= 0; i2--) {
    for (let i1 = len1; i1 >= 0; i1--) {
      // If char in s1 match wiht s3 and remaining char of s1+s2 match with remaining s3
      if (s1[i1] && s1[i1] === s3[i1 + i2] && dp[i2][i1 + 1]) dp[i2][i1] = true;

      // If char in s2 match wiht s3 and remaining char of s1+s2 match with remaining s3
      if (s2[i2] && s2[i2] === s3[i1 + i2] && dp[i2 + 1][i1]) dp[i2][i1] = true;
    }
  }
  console.table(dp);
  return dp[0][0];
}
// Time Complexity: O(s1*s2)
// Space Complexity: O(s2)
function isInterleave(s1, s2, s3) {
  // Get the size of the DP
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  // Edge case if the sum string length not match
  if (len1 + len2 != len3) return false;
  if (len1 > len2) return isInterleave(s2, s1, s3);

  let dp = new Array(len1 + 1).fill(false);
  let newDp = new Array(len1 + 1).fill(false);
  newDp[len1] = true;

  for (let i2 = len2; i2 >= 0; i2--) {
    for (let i1 = len1; i1 >= 0; i1--) {
      // If char in s1 match wiht s3 and remaining char of s1+s2 match with remaining s3
      if (s1[i1] && s1[i1] === s3[i1 + i2] && newDp[i1 + 1]) newDp[i1] = true;

      // If char in s2 match wiht s3 and remaining char of s1+s2 match with remaining s3
      if (s2[i2] && s2[i2] === s3[i1 + i2] && dp[i1]) newDp[i1] = true;
    }
    dp = newDp;
    newDp = new Array(len1 + 1).fill(false);
    // console.table([dp]);
  }
  return dp[0];
}

// s1 = 'a';
// s2 = 'b';
// s3 = 'ab';
// console.log(isInterleave(s1, s2, s3));

// (s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbcbcac');
// console.log(isInterleave(s1, s2, s3));
// (s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbbaccc');
// console.log(isInterleave(s1, s2, s3));
// s1 = 'ab';
// s2 = 'ccd';
// s3 = 'acdab';
// console.log(isInterleave(s1, s2, s3));
// s1 = 'aabcc';
// s2 = 'dbbca';
// s3 = 'aadbbcbacc';
// console.log(isInterleave(s1, s2, s3));
// s1 = 'a';
// s2 = '';
// s3 = 'a';
// console.log(isInterleave(s1, s2, s3));
// s1 = '';
// s2 = 'b';
// s3 = 'b';
// console.log(isInterleave(s1, s2, s3));
// s1 = 'db';
// s2 = 'b';
// s3 = 'cbb';
// console.log(isInterleave(s1, s2, s3));
// s1 = 'ab';
// s2 = 'bc';
// s3 = 'bbac';
// console.log(isInterleave(s1, s2, s3));

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// Top down memoization - 10 mins
// Time Complexity: O(len1 * len2)
// Space Complexity: O(len1 * len 2) for cahing + O(max(len1,len2)) for recursion stack
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length != s3.length) return false;
  const cache = {};
  return dfs(0, 0);
  function dfs(i1, i2) {
    const i3 = i1 + i2;
    // Base case:
    // If reach end of s3, return true
    if (i3 === s3.length) return true;
    // If in cache return cache
    const pos = i1 + ',' + i2;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // If match s1, move to next i1 || if match s2, move to next i2
    return (cache[pos] =
      (s1[i1] === s3[i3] && dfs(i1 + 1, i2)) ||
      (s2[i2] === s3[i3] && dfs(i1, i2 + 1)));
  }
};
// 2D Array
// Time Complexity: O(len1 * len2)
// Space Complexity: O(len1 * len 2) for caching
var isInterleave = function (s1, s2, s3) {
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  // Edge case: if len not match, return false
  if (len1 + len2 !== len3) return false;
  const dp = new Array(len1 + 1)
    .fill(false)
    .map((e) => new Array(len2 + 1).fill(false));
  // Initialize condition (a.k.a base case)
  // Reach end: return true
  dp[len1][len2] = true;
  // Loop backward s1
  for (let i1 = len1; i1 >= 0; i1--) {
    // Loop backward s2
    for (let i2 = len2; i2 >= 0; i2--) {
      if (i1 + i2 === len3) dp[i1][i2] = true;
      else {
        // Cur = Match s1 || match s2
        dp[i1][i2] =
          (i1 < len1 && s1[i1] === s3[i1 + i2] && dp[i1 + 1][i2]) ||
          (i2 < len2 && s2[i2] === s3[i1 + i2] && dp[i1][i2 + 1]);
      }
    }
  }
  return dp[0][0];
};

// 1D Array
// Time Complexity: O(len1 * len2)
// Space Complexity: O(min(len1,len2))
var isInterleave = function (s1, s2, s3) {
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  // Edge case: if len not match, return false
  if (len1 + len2 !== len3) return false;
  // Create dp array w/ smaller length
  if (len1 < len2) return isInterleave(s2, s1, s3);
  let dp = new Array(len2 + 1).fill(false);
  let newDp = new Array(len2 + 1).fill(false);
  // Initialize condition (a.k.a base case)
  // Loop backward s1
  for (let i1 = len1; i1 >= 0; i1--) {
    // Loop backward s2
    for (let i2 = len2; i2 >= 0; i2--) {
      // Reach end: return true
      if (i1 + i2 === len3) newDp[i2] = true;
      else {
        // Cur = Match s1 || match s2
        newDp[i2] =
          (i1 < len1 && s1[i1] === s3[i1 + i2] && dp[i2]) ||
          (i2 < len2 && s2[i2] === s3[i1 + i2] && newDp[i2 + 1]);
      }
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[0];
};
(s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbcbcac');
console.log(isInterleave(s1, s2, s3));
(s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbbaccc');
console.log(isInterleave(s1, s2, s3));
(s1 = 'aabd'), (s2 = 'abdc'), (s3 = 'aabdbadc');
console.log(isInterleave(s1, s2, s3));
