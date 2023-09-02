// 5. Longest Palindromic Substring

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
function longestPalindrome(s: string): string {
  // Loop throuhg each char
  let l: number = 0;
  let r: number = 0;
  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = isPalindrome(i, i);
    const [l2, r2] = isPalindrome(i, i + 1);
    if (r1 - l1 > r - l) [l, r] = [l1, r1];
    if (r2 - l2 > r - l) [l, r] = [l2, r2];
  }
  return s.slice(l, r + 1);
  function isPalindrome(l: number, r: number): [number, number] {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--, r++;
    }
    return [l + 1, r - 1];
  }
}
