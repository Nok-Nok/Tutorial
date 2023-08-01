// 213. House Robber II

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
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// This is a DP question (1D/2D)
// Since house are arranged in circle, we will do 2 run of hte array
// Start robbing from the 1st house
// Start robbing from the 2nd house
// Choose the max
// Time Complexity: O(n) since we loop through the nums array twice
// Space Complexity: O(1) since we use loop and we only use 2 pointers cur and prev for tracking the max value we can rob
var rob = function (nums) {
  return Math.max(nums[0], robber(0, nums.length - 1), robber(1, nums.length));
  function robber(start, end) {
    // Initialize the dp array
    let cur = 0;
    let prev = 0;

    // Loop through the house/nums array
    for (let i = start; i < end; i++) {
      // f(n) = Max(cur val + f(n-2), f(n-1))
      // f_next = Max( cur val + f_prev, f_cur)
      const next = Math.max(nums[i] + prev, cur);
      // Move cur and prev pointers up by 1:
      prev = cur;
      cur = next;
    }

    return cur;
  }
};

// Time Complexity: O(n)
// Space Complexity: O(1)
var rob = function (nums) {
  // rob in circle
  // rob first -> second to last
  // rob second -> last home
  return Math.max(nums[0], dfs(0, nums.length - 2), dfs(1, nums.length - 1));
  function dfs(start, end) {
    let prev = 0;
    let cur = 0;
    for (let i = start; i <= end; i++) {
      // next  = max (rob next + prev vs skip next + cur)
      const next = Math.max(nums[i] + prev, cur);
      // Update 2 pointers
      prev = cur;
      cur = next;
    }
    return cur;
  }
};

nums = [2, 3, 2];
console.log(rob(nums));
