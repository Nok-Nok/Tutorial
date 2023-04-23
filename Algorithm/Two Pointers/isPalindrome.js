// Valid Palindrome
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
s consists only of printable ASCII characters.
 */

function isPalindrome(s) {
  // Initialize condition for letter
  const isAlphaNum = (c) => (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
  // Initialize 2 pointers left right
  let left = 0;
  let right = s.length - 1;

  // While left<=right
  while (left <= right) {
    // find left and right chare
    let leftChar = s[left].toLowerCase();
    let rightChar = s[right].toLowerCase();
    // Move left pointer if left is not AlphaNum
    if (!isAlphaNum(leftChar)) left++;
    // Move right pointer if right is not AlphaNum
    else if (!isAlphaNum(rightChar)) right--;
    // Return false if char not match
    else if (leftChar !== rightChar) return false;
    // Else update left and right pointer
    else {
      // Update left & right:
      left++;
      right--;
    }
  }
  return true;
}

// s = 'A man, a plan, a canal: Panama';
// console.log(isPalindrome(s));
// s = 'race a car';
// console.log(isPalindrome(s));

// s = ' ';
// console.log(isPalindrome(s));
