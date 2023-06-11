// Longest Common Subsequence

/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
 */

// Start with 2D DP
// Time Complexity O(n*m) for n is size text 1, and m is size text 2
// Space Complexity O(n*m)
function longestCommonSubsequence(text1, text2) {
  // Obtain the size of 2D DP
  const row = text1.length;
  const col = text2.length;
  // Initiailize a 2D DP to track the longest common subsequence;
  const dp = new Array(row + 1).fill(0).map((e) => new Array(col + 1).fill(0));

  // Traverse through the 2D matrix to calculate the longest common subsequeue
  for (let i1 = row - 1; i1 >= 0; i1--) {
    for (let i2 = col - 1; i2 >= 0; i2--) {
      // Longest sub of [i1->end] & [i2->end]
      /**
       * Longest sub of [i1->end] & [i2->end]
       * = Max of common sub
       * [i1+1->end][i2->end]
       * [i1->end][i2+1->end]
       * if match 1 + [i1+1->end][i2+1->end]
       */
      dp[i1][i2] = Math.max(
        dp[i1 + 1][i2],
        dp[i1][i2 + 1],
        text1[i1] === text2[i2] ? 1 + dp[i1 + 1][i2 + 1] : 0
      );
    }
  }
  // console.table(dp);
  return dp[0][0];
}

// Optimize 2D DP
// Time Complexity O(n*m) for n is size text 1, and m is size text 2
// Space Complexity: Math.max(n,m)
function longestCommonSubsequence(text1, text2) {
  // Initiailize a 2D DP to track the longest common subsequence;
  let prev = new Array(text1.length + 1).fill(0);
  for (let i2 = text2.length - 1; i2 >= 0; i2--) {
    // Intialize a newDP to track the subsequence while traversing throng text2
    const cur = new Array(text1.length+1).fill(0);
    for (let i1 = text1.length - 1; i1 >= 0; i1--) {
      // Longest sub = Max
      /**
       * Longest sub of [i1->end] & [i2->end]
       * = Max of common sub
       * [i1+1->end][i2->end] => cur[i1+1]
       * [i1->end][i2+1->end] => prev[i1]
       * if match 1 + [i1+1->end][i2+1->end] =>prev[i1+1] + 1 if match
       */
      cur[i1] = Math.max(
        cur[i1 + 1],
        prev[i1],
        text1[i1] === text2[i2] ? 1 + prev[i1 + 1] : 0
      );
    }
    prev = cur;
    // console.table([cur, prev]);
  }
  return prev[0];
}
text1 = 'abcdeb';
text2 = 'acbcb';
console.log(longestCommonSubsequence(text1, text2));
