// 3Sum

/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */

// Time Complexity: O(n2) where n is the length of nums array
// Space Complexity: O(1) if we don't count result array for space complexity. Otherwise, it would be O(n) where n is the length of the nums array
function threeSum(nums) {
  // Sort the nums array
  nums = nums.sort((a, b) => a - b);
  // Initialize the result array
  const result = [];

  // Loop through the nums array
  for (let i = 0; i < nums.length; i++) {
    // Skip repeated numbers:
    while (nums[i] === nums[i - 1] && i < nums.length) i++;
    // If nums[i]>0, break out of the loop:
    if (nums[i] > 0) break;

    // Initialize left and right pointers
    let left = i + 1;
    let right = nums.length - 1;
    // While left < right
    while (left < right) {
      // Find the total
      const total = nums[left] + nums[right] + nums[i];
      // if total = 0, push the trio to result array
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Update pointers:
        left++;
        right--;
        // Skip repeated numbers:
        while (nums[left] === nums[left - 1] && left < right) left++;
      }
      // else if total<0, left++
      else if (total < 0) left++;
      // else right--;
      else right--;
    }
  }

  return result;
}

// nums = [-1, 0, 1, 1, 1, 2, -1, -4];
// console.log(threeSum(nums));
// nums = [0, 0, 0, 0, 1, -2, -1, 2, 1];
// console.log(threeSum(nums));
// nums = [-2, 0, 0, 2, 2];
// console.log(threeSum(nums));
