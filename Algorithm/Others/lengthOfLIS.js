// 300. Longest Increasing Subsequence

/**
 * Given an integer array nums, return the length of the longest strictly increasing 
subsequence
.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// Time Complexity: O(n2), can be optimize to O(nlogn) if do binary search
// Space Complexity: O(n)
var lengthOfLIS = function (nums) {
  const result = [nums[0]];

  // Loop from the start of the nums
  for (let i = 1; i < nums.length; i++) {
    const cur = nums[i];
    // If cur val > result last val, push cur val
    if (cur > result[result.length - 1]) result.push(cur);
    // Else: replace
    else {
      // Can do Binary Search, but skip for now
      // Loop from the end of result
      for (let j = result.length - 1; j >= 0; j--) {
        // If prev val not exist || prev val < cur val, perform the replacement
        if (j === 0 || result[j - 1] < cur) {
          result[j] = cur;
          break;
        }
      }
    }
  }
  return result.length;
};

var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // Increase length if prev < cur
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    max = Math.max(max, dp[i]);
  }
  return max;
};

nums = [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12];
console.log(lengthOfLIS(nums));
// nums = nums = [1, 2, 9];
// console.log(lengthOfLIS(nums));
// nums = [7, 7, 7, 7, 7, 7, 7];
// console.log(lengthOfLIS(nums));
