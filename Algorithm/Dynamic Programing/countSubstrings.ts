// 647. Palindromic Substrings

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

// Use technique of spanning from the middle to determine if this is a palindrome
// Time Complexity: O(n2), since for each char, we will loop through the string to count # of palindrome
// Space Complexity: O(n) since we use recursion to find the palindrome
function countSubstrings1(s: string): number {
  let count = 0;
  // Loop through the string
  for (let i = 0; i < s.length; i++) {
    // Look for palindorme, start from the same char or 2 adjacent chars
    count += countPalindrome(i, i) + countPalindrome(i, i + 1);
  }
  return count;
  // A recursive helper function to determine if this is a palindrome
  function countPalindrome(l: number, r: number): number {
    // Base case: if left and right pointer are different or exceed the length of the string, return ...
    if (!s[l] || !s[r] || s[l] !== s[r]) return 0;
    // Recursive case:
    // If match, move left and right + update the count
    return 1 + countPalindrome(l - 1, r + 1);
  }
}

// Time Complexity: O(n2), since for each char, we will loop through the string to count # of palindrome
// Space complexity: O(1)
function countSubstrings(s: string): number {
  let count = 0;
  // Loop through the string
  for (let i = 0; i < s.length; i++) {
    // Look for palindorme, start from the same char or 2 adjacent chars
    count += countPalindrome(i, i) + countPalindrome(i, i + 1);
  }
  return count;
  // A helper function to determine if this is a palindrome
  function countPalindrome(l: number, r: number): number {
    // Intialize count for palindrome
    let count = 0;
    // While left and right pointer are still in the string and 2 char match, update count
    while (s[l] && s[r] && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
    // Return count
    return count;
  }
}

// const s = 'aaa';
// console.log(countSubstrings(s));
