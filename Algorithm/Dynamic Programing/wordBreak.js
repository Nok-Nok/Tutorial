// Word Break

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

// Try DP approach - Bottom Up memoization - use 2D array
// Time Complexity: O(n*m*k)
// The for loop would have O(n*m) where n is the length of the string, m is variety in word length of words in wordDict, which can be upto length of wordDict, and k is the average length of word in wordDict
// Currently ignoring the time complexity added by the slice method
// Space Complexity: O(n+m) dp array would be O(n) where n is the length of the string and wordLength object would be O(m) where m is length of wordDict
function wordBreak(s, wordDict) {
  // Loop through the wordDict and create a set of word length variety
  const wordLength = new Set();
  for (const word of wordDict) {
    wordLength.add(word.length);
  }

  // Convert wordDict to set
  wordDict = new Set(wordDict);
  // Loop from the end of the string
  // This array will store the last position where we get successful substring that can get to the end of the string
  const dp = new Array(s.length + 1).fill(false);
  dp[s.length] = true; //If we get to end of the string, we get a default true

  for (let i = s.length - 1; i >= 0; i--) {
    wordLength.forEach((len) => {
      // if position after the substring is true in dp,
      if (dp[i + len]) {
        const str = s.slice(i, i + len);
        if (wordDict.has(str)) dp[i] = true;
      }
    });
  }
  return dp[0];
}

// (s = 'applepenapple'), (wordDict = ['apple', 'pen']);
// console.log(wordBreak(s, wordDict));
// (s = 'leetcode'), (wordDict = ['leet', 'code']);
// console.log(wordBreak(s, wordDict));
// (s = 'catsandog'), (wordDict = ['cats', 'dog', 'sand', 'and', 'cat']);
// console.log(wordBreak(s, wordDict));
// (s = 'aaaaaaa'), (wordDict = ['aaaa', 'aaa']);
// console.log(wordBreak(s, wordDict));
