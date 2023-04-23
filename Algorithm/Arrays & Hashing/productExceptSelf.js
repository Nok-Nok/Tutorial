//  Product of Array Except Self
/**
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
[1, 1, 2, 6]
[24,12,4,1]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
 */

// Time complexity: O(n) where n is length of nums
// Space complexity: O(1) if output array is not considered to consume space
function productExceptSelf(nums) {
  // Initialize result array:
  const result = new Array(nums.length);

  // Find left product
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }

  // Find right product
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}

// nums = [1, 2, 3, 4];
// console.log(productExceptSelf(nums));

// nums = [-1, 1, 0, -3, 3];
// console.log(productExceptSelf(nums));
