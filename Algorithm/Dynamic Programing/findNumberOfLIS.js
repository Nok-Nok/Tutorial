// 673. Number of Longest Increasing Subsequence

/**
 * Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.

 

Example 1:

Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].
Example 2:

Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, so output 5.
 

Constraints:

1 <= nums.length <= 2000
-106 <= nums[i] <= 106
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// Space Complexity: O(n) since we have 2 arrays to track the length and count
// Time Complexity: O(n2) for the two loops
var findNumberOfLIS = function (nums) {
  // Track the max length of subsequence at each position
  const length = new Array(nums.length).fill(1);
  // Track the max frequency/count at the max length with current number
  const count = new Array(nums.length).fill(1);
  // Track the overall max length & max count
  let maxLength = 0;
  let maxCount = 0;
  // Loop from start of the array
  for (let i = 0; i < nums.length; i++) {
    // Loop to the current position
    for (let j = 0; j < i; j++) {
      // If found a smaller value, update the length & count
      if (nums[j] < nums[i]) {
        // If prev segment + 1 is longer than current length => found longer subsequence
        if (length[j] + 1 > length[i]) {
          // Update length
          length[i] = length[j] + 1;
          // Reset count:
          count[i] = 0;
        }
        // For matching segnment length:
        if (length[j] + 1 === length[i]) {
          // Update count: adding the option
          count[i] += count[j];
        }
      }
    }
    // Update max length & max count
    if (length[i] > maxLength) {
      maxLength = length[i];
      maxCount = 0;
    }
    if (length[i] === maxLength) {
      maxCount += count[i];
    }
  }

  // Return total count for segment w/ matching max length
  return maxCount;
};
nums = [1, 3, 5, 4, 7];
console.log(findNumberOfLIS(nums));
nums = [2, 2, 2, 2, 2];
console.log(findNumberOfLIS(nums));
nums = [3, 1, 2];
console.log(findNumberOfLIS(nums));
