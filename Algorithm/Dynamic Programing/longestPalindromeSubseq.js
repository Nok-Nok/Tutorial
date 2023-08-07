// Longest Palindromic Subsequence

/**
 * Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
Example 2:

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
 

Constraints:

1 <= s.length <= 1000
s consists only of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {number}
 */
// Space Complexity: O(n^2) for caching + O(n) for recursion stack
// Time Complexity: O(n^3) since for
var longestPalindromeSubseq = function (s) {
  let max = 0;
  const cache = {};
  // Loop through the string
  for (let i = 0; i < s.length; i++) {
    const oddLength = dfs(i, i, 0);
    const evenLength = dfs(i, i + 1, 0);
    max = Math.max(max, oddLength, evenLength);
  }
  return max;
  function dfs(start, end, skip) {
    // Base Case: If out of the string length, return the left
    if (start < 0 || end === s.length) {
      // Get the string length inside start & end, exclude start and end minus number of skip letters
      len = end - 1 - (start + 1) + 1 - skip;
      return len;
    }
    // Base case: in cache: will that ever happen:
    const pos = start + ',' + end;
    if (pos in cache) return cache[pos] - skip;

    // Recursive case:
    // If match, move both start and end
    cache[pos] = skip;
    if (s[start] === s[end]) cache[pos] += dfs(start - 1, end + 1, skip);
    // If not match, move either start or end and increase skip by 1
    else {
      cache[pos] += Math.max(
        dfs(start - 1, end, skip + 1),
        dfs(start, end + 1, skip + 1)
      );
    }
    return cache[pos] - skip;
  }
};
// A different approach for top down w memoization
// Time Complexity: O(n^2)
// Space Complexity: O(n^2) for caching + O(n) for recursion stack
var longestPalindromeSubseq = function (s) {
  // Loop from outsidei n
  let l = 0;
  let r = s.length - 1;
  const cache = {};
  return dfs(l, r);
  function dfs(l, r) {
    // Base case: l and r are overlap
    if (r < l) return 0;
    // Base case: l and r meet, return 1
    if (l === r) return 1;
    // Base case: if in cache, return cache
    const pos = l + ',' + r;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // If match, move both l & r
    if (s[l] === s[r]) return (cache[pos] = dfs(l + 1, r - 1) + 2);
    // If not match, move either and take the max
    else return (cache[pos] = Math.max(dfs(l + 1, r), dfs(l, r - 1)));
  }
};

// Try bottom up dp approach
// Time Complexity: O(n^2)
// Space Complexity: O(n^2) for caching
var longestPalindromeSubseq = function (s) {
  // Intiailize the dp array fill w/  since any letter can make a palindrome length of 1
  const dp = new Array(s.length)
    .fill(0)
    .map((e) => new Array(s.length).fill(0));

  for (let l = s.length - 1; l >= 0; l--) {
    // Base case: l and r meet, return 1
    for (let r = l; r <= s.length - 1; r++) {
      // Base case: l and r meet, return 1
      if (l === r) dp[l][r] = 1;
      // If match, move both l & r
      else if (s[l] === s[r]) dp[l][r] = dp[l + 1][r - 1] + 2;
      // If not match, move either and take the max
      else dp[l][r] = Math.max(dp[l + 1][r], dp[l][r - 1]);
    }
  }
  return dp[0][s.length - 1];
};

// Try bottom dp approach with optimize space
// Time Complexity: O(n^2)
// Space Complexity: O(n) for caching
var longestPalindromeSubseq = function (s) {
  // Intiailize the dp array fill w/  since any letter can make a palindrome length of 1
  let dp = new Array(s.length).fill(0);
  let newDp = new Array(s.length).fill(0);

  for (let l = s.length - 1; l >= 0; l--) {
    // Base case: l and r meet, return 1
    for (let r = l; r <= s.length - 1; r++) {
      // Base case: l and r meet, return 1
      if (l === r) newDp[r] = 1;
      // If match, move both l & r
      else if (s[l] === s[r]) newDp[r] = dp[r - 1] + 2;
      // If not match, move either and take the max
      else newDp[r] = Math.max(dp[r], newDp[r - 1]);
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[s.length - 1];
};
s = 'bbbab';
console.log(longestPalindromeSubseq(s));
s = 'cbbd';
console.log(longestPalindromeSubseq(s));
s = 'c';
console.log(longestPalindromeSubseq(s));
