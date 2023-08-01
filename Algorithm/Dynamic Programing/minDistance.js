// Edit Distance

/**
 * Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 

Constraints:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// Top Down w/ memoization
// Time Complexity: O(len1*len2)
// Space Complexity: O(len1*len2) for caching + O(len1 + len2) for recursion stack
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const cache = {};
  return dfs(0, 0);
  function dfs(i1, i2) {
    // Base case: reach to end of word 2, return remaining # of chars in word1 for removing
    if (i2 === len2) return len1 - i1;
    // Base case: reach to end of word1, return remining # of chars in word2 to insert
    if (i1 === len1) return len2 - i2;
    // Base case: if in cache, return cache
    const pos = i1 + ',' + i2;
    if (pos in cache) return cache[pos];
    // Recursive case:
    // If match continue
    if (word1[i1] === word2[i2]) return dfs(i1 + 1, i2 + 1);
    // Else if not match: 3 options, insert || delete || replace
    return (cache[pos] =
      1 + Math.min(dfs(i1, i2 + 1), dfs(i1 + 1, i2), dfs(i1 + 1, i2 + 1)));
  }
};
// Bottom up 2D array
// Time Complexity: O(len1*len2)
// Space Complexity: O(len1*len2) for caching
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  // Initialize dp array
  const dp = new Array(len1 + 1)
    .fill(Infinity)
    .map((e) => new Array(len2 + 1).fill(Infinity));

  // Loop through word1
  for (let i1 = len1; i1 >= 0; i1--) {
    // Loop through word2
    for (let i2 = len2; i2 >= 0; i2--) {
      if (i1 === len1 || i2 === len2) {
        dp[i1][i2] = len2 - i2 + len1 - i1;
      } else if (word1[i1] === word2[i2]) dp[i1][i2] = dp[i1 + 1][i2 + 1];
      else
        dp[i1][i2] =
          1 + Math.min(dp[i1][i2 + 1], dp[i1 + 1][i2], dp[i1 + 1][i2 + 1]);
    }
  }
  return dp[0][0];
};
// Bottom up 1D array
// Time Complexity: O(len1*len2)
// Space Complexity: O(min(len1,len2)) for caching
var minDistance = function (word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  // Initialize dp array with minimum length
  if (len2 > len1) return minDistance(word2, word1);
  let dp = new Array(len2 + 1).fill(Infinity);
  let newDp = new Array(len2 + 1).fill(Infinity);
  // Loop through word1
  for (let i1 = len1; i1 >= 0; i1--) {
    // Loop through word2
    for (let i2 = len2; i2 >= 0; i2--) {
      if (i1 === len1 || i2 === len2) {
        newDp[i2] = len2 - i2 + len1 - i1;
      } else if (word1[i1] === word2[i2]) newDp[i2] = dp[i2 + 1];
      else newDp[i2] = 1 + Math.min(newDp[i2 + 1], dp[i2], dp[i2 + 1]);
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[0];
};
(word1 = 'horse'), (word2 = 'ros');
console.log(minDistance(word1, word2));
(word1 = 'intention'), (word2 = 'execution');
console.log(minDistance(word1, word2));
