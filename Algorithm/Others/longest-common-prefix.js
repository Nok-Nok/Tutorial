/* Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "". (Note: All given inputs are in lowercase letters a-z.)

ex: longestCommonPrefix(["flower","flow","flight"]) --> "fl"

longestCommonPrefix(["dog","racecar","car"]) --> "" (There is no common prefix among the input strings)

*/

// Time Complexity: O(n) where n*m is number of str in the strs array and m is the max length of the str
//  Space Complexity: O(1). If consider result take up space then it would be O(n) where n is length of first string.
const longestCommonPrefix = (strs) => {
  // Initialize result
  let result = '';
  // Loop through all char in the first string
  for (const i in strs[0]) {
    // Loop through all strs in the strs
    // If all strs have the same character at position i, update result
    if (strs.every((_, j) => strs[j][i] === strs[0][i])) {
      result += strs[0][i];
    }
  }
  return result;
};
// console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
// console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
module.exports = { longestCommonPrefix };
