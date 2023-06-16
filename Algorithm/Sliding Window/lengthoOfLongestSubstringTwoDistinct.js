// Longest Substring with At Most Two Distinct Characters

/**
 * Given a string s, return the length of the longest 
substring
 that contains at most two distinct characters.

 

Example 1:

Input: s = "eceba"
Output: 3
Explanation: The substring is "ece" which its length is 3.
Example 2:

Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.
 

Constraints:

1 <= s.length <= 105
s consists of English letters.
 */

var lengthOfLongestSubstringTwoDistinct = function (s) {
  // Intiailize sliding window
  let l = 0;
  // Intiailize a position array to store 1st and last seen pos of 2 distinct char
  let pos = [0, 0];
  let max = 1;
  for (let r = 0; r < s.length; r++) {
    // If char existed
    if (s[r] === s[pos[0]] || s[r] === s[pos[1]]) {
      max = Math.max(max, r - l + 1);
    }
    // Else if char not exist and we already have 2 distinct char
    else {
      // Loop through position from start
      l = r - 1;
      while (l >= 1 && s[l - 1] === s[l]) l--;
      pos = [l, r];
      max = Math.max(max, r - l + 1);
    }
  }
  return max;
};
// s = 'ababababccccccccccca';
// console.log(lengthOfLongestSubstringTwoDistinct(s));
// s = 'eceba';
// console.log(lengthOfLongestSubstringTwoDistinct(s));
// s = 'ccaabbb';
// console.log(lengthOfLongestSubstringTwoDistinct(s));
// s = 'abaccc';
// console.log(lengthOfLongestSubstringTwoDistinct(s));
s = 'aac';
console.log(lengthOfLongestSubstringTwoDistinct(s));
// s = 'abccbbcccaaacaca';
// console.log(lengthOfLongestSubstringTwoDistinct(s));
