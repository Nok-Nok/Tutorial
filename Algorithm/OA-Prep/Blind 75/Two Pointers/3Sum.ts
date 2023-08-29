// 15. 3Sum

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
// Time Complexity: O(nlogn) for sorting + O(n2) for looping find the triplets
// Space Complexity: O(logn) for sorting
function threeSum(nums: number[]): number[][] {
  // Sort the nums array ascending
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  // Loop through the nums array
  for (let i: number = 0; i < nums.length; i++) {
    // Ensure not have duplicate set
    while (nums[i] === nums[i - 1]) i++;
    // Find Target
    const target: number = 0 - nums[i];
    // Initialize 2 pointers:
    let l: number = i + 1;
    let r: number = nums.length - 1;
    while (l < r) {
      // if found the triplet, update result, and move pointers to keep searching
      if (nums[l] + nums[r] === target) {
        result.push([nums[i], nums[l], nums[r]]);
        // Ensure not have duplicate set
        l++;
        while (nums[l] === nums[l - 1]) l++;
        r--;
        while (nums[r] === nums[r + 1]) r--;
      }
      // If more than target, move right
      else if (nums[l] + nums[r] > target) r--;
      // Else move left
      else l++;
    }
  }
  return result;
}

const nums = [-2, 0, 0, 2, 2];
console.log(threeSum(nums));
