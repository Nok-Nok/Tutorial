// Longest Arithmetic Subsequence

/**
 * Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.

Note that:

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).
 

Example 1:

Input: nums = [3,6,9,12]
Output: 4
Explanation:  The whole array is an arithmetic sequence with steps of length = 3.
Example 2:

Input: nums = [9,4,7,2,10]
Output: 3
Explanation:  The longest arithmetic subsequence is [4,7,10].
Example 3:

Input: nums = [20,1,15,3,10,5,8]
Output: 4
Explanation:  The longest arithmetic subsequence is [20,15,10,5].
 

Constraints:

2 <= nums.length <= 1000
0 <= nums[i] <= 500
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  let r = 0;
  const dp = new Array(nums.length).fill(0).map((e) => []);

  let maxLength = 2;
  // Move right pointer from 0 to end
  while (r < nums.length) {
    // Each time the right pointer move by one, we reloop left pointer from 0 to current right pointer
    for (let l = 0; l < r; l++) {
      let found = false;
      for (const [diff, length] of dp[l]) {
        // If there is already a difference, see if that match with the current number at r pointer
        // If is, update the count
        if (nums[r] - nums[l] === diff) {
          maxLength = Math.max(length + 1, maxLength);
          dp[r].push([diff, length + 1]);
          found = true;
        }
      }
      // Add the new difference
      if (!found) dp[r].push([nums[r] - nums[l], 2]);
    }
    // Update r pointer
    r++;
  }
  console.table(dp);
  return maxLength;
};

var longestArithSeqLength = function (nums) {
  // Initialize dp array
  const dp = new Array(nums.length).fill(0).map((e) => {
    return {};
  });
  // Intialize max length
  let max = 0;
  // Loop right pointer through the nums array
  for (let r = 0; r < nums.length; r++) {
    // Loop left pointer from start to right pointer
    for (let l = 0; l < r; l++) {
      // Calculate the difference between left and current right
      const diff = nums[r] - nums[l];
      // Update length f(n) = f(n) + 1 if the diff match
      dp[r][diff] = (dp[l][diff] ?? 1) + 1;
      // Update max
      if (dp[r][diff] > max) max = dp[r][diff];
    }
  }
  return max;
};
// nums = [20, 1, 15, 3, 10, 5, 8];
// console.log(longestArithSeqLength(nums));
