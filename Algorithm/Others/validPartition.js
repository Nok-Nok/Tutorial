// 2369. Check if There is a Valid Partition For The Array

/**
 * You are given a 0-indexed integer array nums. You have to partition the array into one or more contiguous subarrays.

We call a partition of the array valid if each of the obtained subarrays satisfies one of the following conditions:

The subarray consists of exactly 2 equal elements. For example, the subarray [2,2] is good.
The subarray consists of exactly 3 equal elements. For example, the subarray [4,4,4] is good.
The subarray consists of exactly 3 consecutive increasing elements, that is, the difference between adjacent elements is 1. For example, the subarray [3,4,5] is good, but the subarray [1,3,5] is not.
Return true if the array has at least one valid partition. Otherwise, return false.

 

Example 1:

Input: nums = [4,4,4,5,6]
Output: true
Explanation: The array can be partitioned into the subarrays [4,4] and [4,5,6].
This partition is valid, so we return true.
Example 2:

Input: nums = [1,1,1,2]
Output: false
Explanation: There is no valid partition for this array.
 

Constraints:

2 <= nums.length <= 105
1 <= nums[i] <= 106
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// This seems to be a a DP problem
// Do the topdown first
// Need to be CONTINUOUS subarray
var validPartition = function (nums) {
  // console.log(nums);
  const cache = {};
  // Loop from the end
  return dfs(nums.length - 1);

  function dfs(i) {
    // Base case:
    if (i < 0) return true;
    if (i in cache) return cache[i];
    // Recursive case:
    let result = false;
    // Option 1, form a partition of 2 equal, check the remaining
    if (nums[i] === nums[i - 1]) result = result || dfs(i - 2);
    // Option 2: form a partion of 3 equal, check the remaining
    if (nums[i] === nums[i - 1] && nums[i] === nums[i - 2])
      result = result || dfs(i - 3);
    // Option 3: form a parition of 3 consecutive
    if (nums[i] - nums[i - 1] === 1 && nums[i - 1] - nums[i - 2] === 1)
      result = result || dfs(i - 3);
    return (cache[i] = result);
  }
};

// Bottom up 1D Dp
var validPartition = function (nums) {
  const dp = new Array(nums.length + 2).fill(false);
  dp[nums.length + 1] = true;
  dp[nums.length] = true;
  for (let i = nums.length - 1; i >= 0; i--) {
    // Option 1, form a partition of 2 equal, check the remaining
    const op1 = nums[i] === nums[i + 1] && dp[i + 2];
    // Option 2: form a partion of 3 equal, check the remaining
    const op2 = nums[i] === nums[i + 1] && nums[i] === nums[i + 2] && dp[i + 3];
    // Option 3: form a parition of 3 consecutive
    const op3 =
      nums[i + 1] - nums[i] === 1 &&
      nums[i + 2] - nums[i + 1] === 1 &&
      dp[i + 3];
    dp[i] = op1 || op2 || op3;
  }
  return dp[0];
};

// Bottm up Optimized Space
var validPartition = function (nums) {
  let next1 = true;
  let next2 = true;
  let next3 = true;
  for (let i = nums.length - 1; i >= 0; i--) {
    // Option 1, form a partition of 2 equal, check the remaining
    const op1 = nums[i] === nums[i + 1] && next2;
    // Option 2: form a partion of 3 equal, check the remaining
    const op2 = nums[i] === nums[i + 1] && nums[i] === nums[i + 2] && next3;
    // Option 3: form a parition of 3 consecutive
    const op3 =
      nums[i + 1] - nums[i] === 1 && nums[i + 2] - nums[i + 1] === 1 && next3;
    // Update:
    [next1, next2, next3] = [op1 || op2 || op3, next1, next2];
  }
  return next1;
};

nums = [5, 6, 7, 8, 9, 10];
console.log(validPartition(nums));
