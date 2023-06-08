// Palindromic Substrings
/**
 * Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
 */
// Expand Around Possible Centers Approach
// Time Complexity: O(n2): Loop through each character, expand at each character to find a palindrome
// Space Complexity: O(1)
function countSubstrings(s) {
  let count = 0;
  // Loop through each char of string
  for (let i = 0; i < s.length; i++) {
    // Expand and count up the amount of palidrome
    count += countPalindrome(i, i) + countPalindrome(i, i + 1);
  }
  return count;
  // Check for palindrome
  function countPalindrome(start, end) {
    let count = 0;
    while (s[start] === s[end] && start >= 0 && end < s.length) {
      // Update count for palindrome
      count++;
      // Expand the palindrome
      start--;
      end++;
    }
    return count;
  }
}

// 2D - DP approach
// Time Complexity: O(n2)
// Space Complexity: O(n2)
function countSubstrings(s) {
  const len = s.length;
  // Initialize a 2D array to store possible combination
  const isPalindrome = new Array(len)
    .fill(0)
    .map((e) => new Array(len).fill(false));

  let count = 0;
  // Loop through the 2D array to count palindrome
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      // If characters at two position match, the length is <=2 or the sub string is a palidrome, update matrix and count
      if (s[i] === s[j] && (j - i <= 1 || isPalindrome[i + 1][j - 1])) {
        isPalindrome[i][j] = true;
        count++;
      }
    }
  }
  return count;
}

// Optimized 2D - DP approach
// Time Complexity: O(n2)
// Space Complexity: O(n)
function countSubstrings(s) {
  const len = s.length;
  // Initialize an array to store possible palindrome
  let isPalindrome = new Array(len).fill(false);
  let count = 0;
  // Recompute the array by expanding the string
  for (let i = len - 1; i >= 0; i--) {
    const newPalindromeComb = new Array(len).fill(false);
    for (let j = i; j < len; j++) {
      if (s[i] === s[j] && (j - i <= 1 || isPalindrome[j - 1])) {
        newPalindromeComb[j] = true;
        count++;
      }
    }
    isPalindrome = newPalindromeComb;
  }
  return count;
}
// s = 'aba';
// console.log(countSubstrings(s));
// s = 'aaa';
// console.log(countSubstrings(s));
