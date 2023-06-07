// Maximum Product Subarray

/**
 * Given an integer array nums, find a 
subarray
 that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 

Constraints:

1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 */

// Time Complexity: O(n)
// Space Complexity: O(1)
// Use DP tabulation
function maxProduct(nums) {
  let max = 1;
  let min = 1;
  let maxP = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    // Update max min
    const newMax = Math.max(max * nums[i], min * nums[i], nums[i]);
    const newMin = Math.min(max * nums[i], min * nums[i], nums[i]);
    max = newMax;
    min = newMin;
    // Update max product
    maxP = Math.max(maxP, max);
  }
  return maxP;
}

// nums = [2, 3, -2, -4];
// console.log(maxProduct(nums));
// nums = [-2, 0, -2, -2];
// console.log(maxProduct(nums));
// nums = [-2, 0, -1, -3];
// console.log(maxProduct(nums));
// nums = [-2];
// console.log(maxProduct(nums));
// nums = [3, -1, 4, -1];
// console.log(maxProduct(nums));
// nums = [2, -5, -2, -4, 3];
// console.log(maxProduct(nums));
