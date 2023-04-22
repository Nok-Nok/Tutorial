// Two Sum
/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 */
// Time Complexity: O(n) where n is the length of nums array
// Space Complexity: O(n) where n is the length of the nums array
function twoSum(nums, target) {
  // Initialize a cache
  const cache = {};
  // Loop through the array
  for (const i in nums) {
    // If num in cache, return the pair
    if (nums[i] in cache) return [cache[nums[i]], i];
    // Store the remaining (target-cur num) in the cache
    else cache[target - nums[i]] = i;
  }
}
// (nums = [3, 2, 4]), (target = 6);
// console.log(twoSum(nums, target));
// (nums = [3, 3]), (target = 6);
// console.log(twoSum(nums, target));
