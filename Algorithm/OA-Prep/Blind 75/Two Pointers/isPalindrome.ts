// 125. Valid Palindrome

/**
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 

Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters
 */
// Time Complexity: O(n)
// Space Complexity: O(1)
function isPalindrome(s: string): boolean {
  // Get two pointer
  let l = 0;
  let r = s.length - 1;
  const isAlphaNumberic = (c: string): boolean =>
    (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
  // While the two has not passed
  while (l < r) {
    let charL = s[l].toLocaleLowerCase();
    let charR = s[r].toLocaleLowerCase();
    // Move left if not a char
    while (!isAlphaNumberic(charL) && l < r) charL = s[++l].toLocaleLowerCase();
    // Move right if not a char
    while (!isAlphaNumberic(charR) && l < r) charR = s[--r].toLocaleLowerCase();
    // Return if 2 chars not match
    if (charL != charR) return false;
    // Else, move both left and right
    l++;
    r--;
  }
  return true;
}

const s = 'A man, a plan, a canal: Panama';
console.log(isPalindrome(s));
