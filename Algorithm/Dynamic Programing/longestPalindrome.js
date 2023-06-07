// Longest Palindromic Substring
/**
 * Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
 */

function longestPalindrome(s) {
  let maxStart = 0;
  let maxEnd = 0;
  // Loop through the string
  for (let i = 0; i < s.length; i++) {
    const [start1, end1] = findPalindrome(s, i - 1, i + 1);
    const [start2, end2] = findPalindrome(s, i, i + 1);
    if (end1 - start1 > maxEnd - maxStart) {
      maxStart = start1;
      maxEnd = end1;
    }
    if (end2 - start2 > maxEnd - maxStart) {
      maxStart = start2;
      maxEnd = end2;
    }
  }
  return s.slice(maxStart, maxEnd + 1);
  function findPalindrome(s, start, end) {
    // Base case: start/end exceed s or not match, return previous start,end
    if (start < 0 || end === s.length || s[start] !== s[end]) {
      return [start + 1, end - 1];
    }
    // Recursive
    return findPalindrome(s, start - 1, end + 1);
  }
}

function longestPalindrome(s) {
  let maxStr = '';
  // Loop through the string
  for (let i = 0; i < s.length; i++) {
    const str1 = findPalindrome(s, i - 1, i + 1);
    const str2 = findPalindrome(s, i, i + 1);
    if (str1.length > maxStr.length) maxStr = str1;
    if (str2.length > maxStr.length) maxStr = str2;
  }
  return maxStr;
  function findPalindrome(s, start, end) {
    // Base case: start/end exceed s or not match, return previous start,end
    if (start < 0 || end === s.length || s[start] !== s[end]) {
      return s.slice(start + 1, end);
    }
    // Recursive
    return findPalindrome(s, start - 1, end + 1);
  }
}
// s = 'aacabdkacaa';
// console.log(longestPalindrome(s));
