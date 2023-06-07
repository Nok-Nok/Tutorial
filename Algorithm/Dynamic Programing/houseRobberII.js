// House Robber II

/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
 */

function rob(nums) {
  if (nums.length === 1) return nums[0];
  return Math.max(
    // Skip last house
    findMax(nums, 0, nums.length - 1),
    // Skip first house
    findMax(nums, 1, nums.length)
  );
}
function findMax(nums, start, end) {
  let rob1 = (rob2 = 0);
  for (let i = start; i < end; i++) {
    // Get the max of the current index: current+2house before || the total from 1 house previously
    const temp = Math.max(rob1, rob2 + nums[i]);
    // Move rob1 and rob2 up:
    rob2 = rob1;
    rob1 = temp;
  }
  return rob1;
}

// nums = [2, 3, 2];
// console.log(rob(nums));
// nums = [1, 2, 3, 1];
// console.log(rob(nums));
