// Longest Substring Without Repeating Characters
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

// Time complexity: O(n) since we loop through each char of the string
// Space complexity: O(n) if all characters are unique
function lengthOfLongestSubstring1(s) {
  // Intiailize the sliding window
  let iS = 0;
  const pos = {};

  // Initialize the maxLength
  let maxLength = 0;

  // Loop through all character in the string
  for (let i = 0; i < s.length; i++) {
    // If char in pos object and its previous position is >= iS, which means it is contained in the current substring
    if (s[i] in pos && pos[s[i]] >= iS) {
      // Uppdate maxLength
      maxLength = Math.max(maxLength, i - iS);
      // Update start position of the substring
      iS = pos[s[i]] + 1;
    }
    // Cached the position of the character
    pos[s[i]] = i;
  }

  // Return the max of previous maxLength and the length of current substring
  return Math.max(maxLength, s.length - iS);
}

// Other approach
function lengthOfLongestSubstring(s) {
  // Initialize a set to store character of a substring
  const charSet = new Set();
  // Initialize left pointer of the sliding window
  let l = 0;
  // Intialize maxLength of substring
  let maxLength = 0;

  // Loop through the str
  for (r in s) {
    // If found duplicate characters, remove char from set until all char are unique
    while (charSet.has(s[r])) {
      charSet.delete(s[l++]);
    }
    // Add char to charSet
    charSet.add(s[r]);
    // Update maxLength
    maxLength = Math.max(maxLength, r - l + 1);
  }
  // Return result
  return maxLength;
}
// s = 'abcbabcbbdcbabbbabchgul';
// console.log(lengthOfLongestSubstring(s));
