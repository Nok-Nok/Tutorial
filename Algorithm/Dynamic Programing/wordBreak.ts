// 139. Word Break

/**
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */

// Time Complexity: O(string length * # word * average word length)
// Space Complexity: O(string length)
function wordBreak(s: string, wordDict: string[]): boolean {
  const stringLen: number = s.length;
  // Initialize a dp array
  const dp: boolean[] = new Array(stringLen + 1).fill(false);
  // When we have nothing in the string, assume that is true since we will need no word from wordDict to construct an empty string
  dp[stringLen] = true;

  // Loop backward the string
  for (let i: number = stringLen - 1; i >= 0; i--) {
    // Loop through the wordDict
    for (const word of wordDict) {
      const wordLength: number = word.length;
      // If portion after this word is constructable AND, the word match
      if (dp[i + wordLength] && s.slice(i, i + wordLength) === word)
        dp[i] = true;
    }
  }
  return dp[0];
}
const s = 'applepenappleapplepen',
  wordDict = ['apple', 'pen'];
console.log(wordBreak(s, wordDict));
