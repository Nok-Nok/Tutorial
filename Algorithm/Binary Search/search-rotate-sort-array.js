// Search in Rotated Sorted Array

/*
 *There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104 
 */

function search(nums, target) {
  // Initialize left and right pointers
  let left = 0;
  let right = nums.length - 1;
  // While left<=right
  while (left <= right) {
    // Find the mid point
    const mid = Math.floor((left + right) / 2);
    const midVal = nums[mid];
    // If match, return index
    if (midVal === target) return mid;
    // If mid on left portion
    if (midVal >= nums[left]) {
      // Move left pointer if target > midVal or if target on right portion
      // Else move right pointer
      target > midVal || target < nums[left]
        ? (left = mid + 1)
        : (right = mid - 1);
    }
    // Else if mid on right portion
    else {
      // Move right pointer if target < midVal or if target on left portion
      target < midVal || target >= nums[left]
        ? (right = mid - 1)
        : (left = mid + 1);
    }
  }

  // If not found, return -1
  return -1;
}

// (nums = [4, 5, 6, 7, 0, 1, 2]), (target = 2);
// console.log(search(nums, target));
// (nums = [3, 4, 5, 6, 7, 0]), (target = 0);
// console.log(search(nums, target));
// // (nums = [1]), (target = 0);
// // console.log(search(nums, target));

// (nums = [3, 5, 1]), (target = 1);
// console.log(search(nums, target));
// (nums = [5, 1, 3]), (target = 1);
// console.log(search(nums, target));
// (nums = [5, 1, 2, 3, 4]), (target = 4);
// console.log(search(nums, target));
