// Jump Game

/**
 * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 105
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// DP appraoch
var canJump = function (nums) {
  let cache = new Set();
  return dfs(0);
  function dfs(i) {
    // Base case: if pass the length of nums, return true
    if (i >= nums.length - 1) return true;
    if (cache.has(i)) return false;
    // Recursive case:
    let stepChoice = nums[i];
    while (stepChoice) {
      if (dfs(i + stepChoice)) return true;
      // Update
      stepChoice--;
    }
    cache.add(i);
    return false;
  }
};

// Greedy appraoch
var canJump = function (nums) {
  // Intialize the goal
  let goal = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    // If steps from current location exceed goal, update the goal
    if (nums[i] + i >= goal) goal = i;
  }
  // If our goal get move to initial position, we should be able to go the end goal from the initial position
  return goal === 0;
};

nums = [2, 3, 1, 1, 4];
console.log(canJump(nums));
nums = [3, 2, 1, 0, 4];
console.log(canJump(nums));
