//  Longest Repeating Character Replacement
/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
 */

function characterReplacement(s, k) {
  // Intialize a cache for the substring
  let frequency = new Array(26).fill(0);
  // Initialize left pointer for the sliding window
  let l = 0;
  // Initialize maxLength of the substring
  let maxLength = 0;
  // Loop through the string
  for (const r in s) {
    // Update frequency of the character
    frequency[s.charCodeAt(r) - 65]++;
    let newLength = r - l + 1;
    // Update the substring until only k char to be replaced
    while (newLength - Math.max(...frequency) > k) {
      frequency[s.charCodeAt(l) - 65]--;
      l++;
      // Update length of the substring
      newLength--;
    }
    maxLength = Math.max(maxLength, newLength);
  }
  return maxLength;
}
// (s = 'ABABCDEFEEKEEE'), (k = 2);
// // console.log(characterReplacement(s, k));
// (s = 'ABAA'), (k = 0);
// console.log(characterReplacement(s, k));
