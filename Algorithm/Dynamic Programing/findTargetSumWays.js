// Target Sum

/**
 * You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

 

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
 */

function findTargetSumWays(nums, target) {
  let combs = new Map(); //key: total, val: freq
  combs.set(0, 1); //
  for (const num of nums) {
    const newComb = new Map();
    combs.forEach((_, tot) => {
      // Update newComb
      // # of combs = current # of combs to get to tot+num + # of combs that is num steps away from total
      newComb.set(tot + num, (newComb.get(tot + num) || 0) + combs.get(tot));
      newComb.set(tot - num, (newComb.get(tot - num) || 0) + combs.get(tot));
    });
    combs = newComb;
  }
  return combs.get(target) || 0;
}
// DP Top-Down Memoization
function findTargetSumWays(nums, target) {
  const dp = {};
  dfs(nums, 0, target);
  return dp[0 + ',' + target];
  function dfs(nums, i, target) {
    // Base Case: If i exceed nums length, return 1 if target is reached
    if (i === nums.length) return target === 0 ? 1 : 0;
    // Base Case: If combination of i & target has been done before, return cache value
    const key = i + ',' + target;
    if (key in dp) return dp[key];
    // Recursive Case:
    // 2 options: add or minus the curernt nums[i]
    return (dp[key] =
      dfs(nums, i + 1, target - nums[i]) + dfs(nums, i + 1, target + nums[i]));
  }
}

// 2D-DP:
// Time Complexity: O(t*n) where t is the total of nums array and n is the lenght of the array
// Space Complexity: O(t) where t is the total of nums array
function findTargetSumWays(nums, target) {
  let tot = 0;
  nums.forEach((e) => (tot += e));
  // Initialize an array to store combs to reach -total -> 0 -> total
  let combs = new Array(tot * 2 + 1).fill(0);
  combs[tot] = 1; //Initialize, no coin, position tot, which is for 0 should have 1 comb
  // Loop through the nums array
  for (const num of nums) {
    // Create newComb array for the next num:
    const newComb = new Array(tot * 2 + 1).fill(0);
    for (let tot = 0; tot < combs.length; tot++) {
      // Two choices: add or subtract num
      newComb[tot] = (combs[tot + num] || 0) + (combs[tot - num] || 0);
    }
    // Replace combination
    combs = newComb;
  }
  // position tot is 0 => to get value of target, we would be at position tot+target
  return combs[tot + target] || 0;
}
(nums = [1, 1, 1, 1, 1]), (target = 3);
console.log(findTargetSumWays(nums, target));
(nums = [0, 0, 0, 0]), (target = 0);
console.log(findTargetSumWays(nums, target));
(nums = [5]), (target = 5);
console.log(findTargetSumWays(nums, target));
