// 340. Longest Substring with At Most K Distinct Characters

/**
 * Given a string s and an integer k, return the length of the longest 
substring of s that contains at most k distinct characters.

 

Example 1:

Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.
Example 2:

Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.
 

Constraints:

1 <= s.length <= 5 * 104
0 <= k <= 50
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
// This is a sliding window problem
// Time Complexity: Each character get evaluated once => O(n);
// Space Complexity: Use cache to cache unique character, if I use delete operation, then cache will have size of O(k) else if I just reassign the value to undefined, cache will have size of O(n)
var lengthOfLongestSubstringKDistinct = function (s, k) {
  // Intialize a left pointer
  let l = 0;
  // Initilaize maxLength
  let maxLength = 0;
  // Intialize a cache
  const cache = {};

  // Traverse the right pointer accross the string
  for (let r = 0; r < s.length; r++) {
    // If char in cache,
    if (cache[s[r]] != undefined) {
      // update last seen position in cache
      cache[s[r]] = r;
    }
    // Else => may reset sliding window
    else {
      // Add char and its position to cache
      cache[s[r]] = r;
      // If (k) => decrease k
      if (k) k--;
      // Else move left pointer
      else {
        // Move till we can pop a char from cache
        while (l != cache[s[l]]) {
          l++;
        }
        cache[s[l]] = undefined; //Change from delete operation to undefine to optimize the running time. This will sacrifice the space complexity a bit, but it will still be a lot faster
        l++;
      }
    }
    // update max length
    maxLength = Math.max(r - l + 1, maxLength);
  }

  return maxLength;
};
// (s = 'eceacecaececba'), (k = 2);
// console.log(lengthOfLongestSubstringKDistinct(s, k));
