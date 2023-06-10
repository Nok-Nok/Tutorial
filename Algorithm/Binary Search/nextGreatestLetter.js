// Find Smallest Letter Greater Than Target

/**
 * You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

 

Example 1:

Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.
Example 2:

Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.
Example 3:

Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].
 

Constraints:

2 <= letters.length <= 104
letters[i] is a lowercase English letter.
letters is sorted in non-decreasing order.
letters contains at least two different characters.
target is a lowercase English letter.
 */

// Time complexity: O(log n) where n is length of the letters array
// Space complexity: O(1)
function nextGreatestLetter(letters, target) {
  // Initialize left & right pointer for BS
  let l = 0;
  let r = letters.length - 1;

  while (l <= r) {
    // Find mid point
    const m = Math.floor((l + r) / 2);
    // Base Case: if current char > target & previous char is <= target
    if ((m === 0 || letters[m - 1] <= target) && letters[m] > target)
      return letters[m];
    // If <=, search right
    if (letters[m] <= target) l = m + 1;
    // Else search right
    else r = m - 1;
  }
  // If can't find, return 1st char
  return letters[0];
}
(letters = ['c', 'f', 'j']), (target = 'a');
console.log(nextGreatestLetter(letters, target));
(letters = ['c', 'f', 'j']), (target = 'c');
console.log(nextGreatestLetter(letters, target));
(letters = ['x', 'x', 'y', 'y']), (target = 'z');
console.log(nextGreatestLetter(letters, target));
(letters = ['c', 'f', 'j']), (target = 'g');
console.log(nextGreatestLetter(letters, target));
(letters = ['e', 'e', 'e', 'e', 'e', 'e', 'n', 'n', 'n', 'n']), (target = 'e');
console.log(nextGreatestLetter(letters, target));
