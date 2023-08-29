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
// Time Complexity: O(logn)
// Space Complexity: O(1)
function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    // Base case: found return num
    if (nums[m] === target) return m;
    // If mid point on left portion
    if (nums[m] >= nums[l]) {
      // If target on left portion & target < mid => move right
      if (target >= nums[l] && target < nums[m]) r = m - 1;
      // Else move left
      else l = m + 1;
    }
    // if mid point on right protion
    else {
      // If target on right portion && target > mid => move left
      if (target <= nums[r] && target > nums[m]) l = m + 1;
      else r = m - 1;
    }
  }
  // If not found, return -1
  return -1;
}

const nums = [7, 0];
console.log(search(nums, 7));
