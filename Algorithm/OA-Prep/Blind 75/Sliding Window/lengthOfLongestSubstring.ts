// 3. Longest Substring Without Repeating Characters

/**
 * Given a string s, find the length of the longest 
substring
 without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 */

// Find substring => sliding window
// Space Complexity: O(n), max size would be 26
// Time Complexity: O(2*n)
function lengthOfLongestSubstring(s: string): number {
  let l: number = 0;
  let maxLength = 0;
  // Intiailize a cache to store unique character
  const cache: Set<string> = new Set();
  for (let r: number = 0; r < s.length; r++) {
    // If char in cache
    while (cache.has(s[r])) {
      cache.delete(s[l++]);
    }

    cache.add(s[r]);
    maxLength = Math.max(r - l + 1, maxLength);
  }
  return maxLength;
}

const s = 'abcabcbb';
console.log(lengthOfLongestSubstring(s));
