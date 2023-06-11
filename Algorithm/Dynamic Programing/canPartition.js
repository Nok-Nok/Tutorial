// Partition Equal Subset Sum

/**
 * Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
 */

// Top Down DP with memoization
function canPartition(nums) {
  let tot = 0;
  nums.forEach((e) => (tot += e));
  // Return false for odd tot
  if (tot % 2) return false;
  const cache = new Set();
  return dfs(nums, 0, tot / 2);
  function dfs(nums, i, target) {
    // Base case if key already in cache
    const key = i + ',' + target;
    if (cache.has(key)) {
      return cache[key];
    }
    cache.add(key);
    // Base case if target <0, return false:
    if (target === 0) return true;
    if (target < 0 || i === nums.length) {
      return false;
    }
    // Recursive case:
    return dfs(nums, i + 1, target - nums[i]) || dfs(nums, i + 1, target);
  }
}

// Bottom Up DP
// function canPartition(nums) {
//   let tot = 0;
//   nums.forEach((e) => (tot += e));
//   // Return false for odd tot
//   if (tot % 2) return false;
//   let combs = new Set([0]);
//   const target = tot / 2;
//   // Loop through the array, find all possible combs:
//   for (let i = 0; i < nums.length; i++) {
//     const newComb = new Set();
//     combs.forEach((comb) => {
//       newComb.add(comb + nums[i]);
//       newComb.add(comb);
//     });
//     if (newComb.has(target)) return true;
//     combs = newComb;
//   }
//   return false;
// }

//  Will do DP with memoization, but don't know if I should do bottom up and topdonw
//  Will do DFS, rather 1D array
// Time Complexity: worst case is when there is no overlapping, a.k.a no memoization => O(m*n) where m is length of nums and n is target to reach
// Space Complexity: O(m*n): Caching using key = 'i,total' (a 2D position) where m is length of nums and n is target to reach. Additionally, we will also consume O(m) for recursion call stack.
function canPartition(nums) {
  // Find the target
  const target = nums.reduce((tot, cur) => (tot += cur), 0) / 2;
  // If the sum is uneven, return false;
  if (target !== Math.floor(target)) return false;
  return dfs(nums, 0, target, new Set(), 0);

  function dfs(nums, i, target, cache, total) {
    // Base case: if meet target , return true
    if (total === target) return true;
    // Base case: if in cache or total>target or i exceeds num, return false
    const key = i + ',' + total;
    if (cache.has(key) || total > target || i === nums.length) return false;

    // Recursive:
    // Update cache
    cache.add(key);
    // Option 1: Add number
    // Option 2: Not Add number
    // Return true if either options is true
    return (
      dfs(nums, i + 1, target, cache, total + nums[i + 1]) ||
      dfs(nums, i + 1, target, cache, total)
    );
  }
}

// Time Complexity: O(n*t) where n is length of nums and t is the target subsetSub
// Space Complexity: O(t) where t is the target subsetSum
function canPartition(nums) {
  // Find the target
  const target = nums.reduce((tot, cur) => (tot += cur), 0) / 2;
  // If the sum is uneven, return false;
  if (target !== Math.floor(target)) return false;

  // Create a 1D array
  let dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    let newDp = [];
    for (let i = 0; i < dp.length; i++) {
      newDp[i] = dp[i] || dp[i - num] || false;
    }
    dp = newDp;
  }
  return dp[target];
}

// Can we do this using 1D array
nums = [1, 5, 11, 5];
console.log(canPartition(nums));
nums = [1, 2, 3, 8];
console.log(canPartition(nums));
nums = [7, 6, 4, 3];
console.log(canPartition(nums));
nums = [1, 2, 5];
console.log(canPartition(nums));
