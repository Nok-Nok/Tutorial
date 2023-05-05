/*

Given a string, find the length of the longest substring without repeating characters.
Just return the length of the substring, not the substring itself.

Example 1:
Input: "abcabcbb"
Output: 3
Explanation: The longest substring is "abc", with the length of 3.

Example 2:
Input: "bbbbb"
Output: 1
Explanation: The longest substring is "b", with the length of 1.

Example 3:
Input: "pwwkew"
Output: 3
Explanation: The longest substring is "wke", with the length of 3.
Note that the longest substring must actually be a substring, as "pwke" is a
subsequence and not a substring.

Example 4:
Input: ""
Output: 0
Explanation: an empty string has length 0

Hint: think about the largest valid "window" of a substring without repeating
characters. How do we keep track of this "window"?

*/

// This is sliding window question
const substringNonrepeating = (str) => {
  // Initialize a position cache to store unique character and their most recent position
  const pos = {};
  // Initialize left pointer - the start of the sliding window
  let l = 0;
  // Initialize maxLength to track the maximum length of non-repeating substring
  let maxLength = 0;

  // Traverse the right pointer through the array
  for (let r = 0; r < str.length; r++) {
    // Obtain the character at the current position
    const char = str[r];
    // If[the cache position is within the sliding window], udpate the left pointer of the sliding wind
    if (pos[char] >= l) l = pos[char] + 1;

    // Update position cache
    pos[char] = r;
    // Update the maxLength as applicable
    maxLength = Math.max(maxLength, r - l + 1);
  }
  return maxLength;
};

module.exports = { substringNonrepeating };
