//  Palindrome Partitioning
/**
 * Given a string s, partition s such that every 
substring
 of the partition is a 
palindrome
. Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
 */
// Time Complexity: 2^N * N where N is length of the string. We have 2^N options and for each option, we need to spread the comb, which is max length of N
// Space Complexity: N where N is the length of the string

function partition1(s) {
  const result = [];
  const comb = [];
  dfs(0, comb);
  return result;
  function dfs(i, comb) {
    // Base case: if i exceed s length, push the comb
    if (i >= s.length) return result.push([...comb]);

    // Loop from position i to end of string
    for (let j = i; j < s.length; j++) {
      // Only search if left is a palindrome
      if (isPalindrome(s, i, j)) {
        // Update comb with left left portion
        comb.push(s.slice(i, j + 1));
        // Search right portion
        dfs(j + 1, comb);
        // Back Tracking
        comb.pop();
      }
    }
  }
}

function partition(s) {
  const result = [];
  const comb = [];
  dfs(0, 0);
  return result;

  function dfs(l, r) {
    // Base Case: if reach the end of the string, end the search
    if (r === s.length) {
      // If all string has been pushed into the comb, push to result
      if (l === s.length) result.push(comb.slice());
      return;
    }
    // Recursive Case:
    // Option 1: Push left portion to comb if it is valid palindrome
    if (isPalindrome(s, l, r)) {
      // Push left portion
      comb.push(s.slice(l, r + 1));
      // Search right portion
      dfs(r + 1, r + 1);
      // Back Track
      comb.pop();
    }
    // Option 2: Skip the to next index
    dfs(l, r + 1);
  }
}
function isPalindrome(str, l, r) {
  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++, r--;
  }
  return true;
}
// str = 'aabcb';
// console.log(isPalindrome(str, 0, str.length - 1));
// console.log(partition(str));
