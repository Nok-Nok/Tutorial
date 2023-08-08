// 33. Search in Rotated Sorted Array

/**
 * There is an integer array nums sorted in ascending order (with distinct values).

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

// This is a binary search, but there is 2 portions, how will we determin if the number is with which portion
// If num > begining number => it is on the left portion. Else it is on the right portion
// Time Complexity: O(logn) since we did binary search
// Space Complexity: O(1) since we only have pointers
function search(nums: number[], target: number): number {
  // Initialize left and right pointers
  let l: number = 0;
  let r: number = nums.length - 1;
  // While left and right has not passed
  while (l <= r) {
    // find mid pointer
    const m = Math.floor((l + r) / 2);
    // Base case: if found, return position
    if (nums[m] === target) return m;
    // Recursive case:
    // If both mid and target on left portion or both on right portion
    if (
      (nums[m] >= nums[l] && target >= nums[l]) ||
      (nums[m] <= nums[r] && target <= nums[r])
    ) {
      if (target < nums[m]) r = m - 1;
      else l = m + 1;
    }
    // If mid on left, and target on right
    else if (nums[m] >= nums[l]) l = m + 1;
    // If mid on right and target on left
    else r = m - 1;
  }
  return -1;
}
const nums = [4, 5, 6, 7, 8, 1, 2, 3],
  target = 8;
console.log(search(nums, target));
