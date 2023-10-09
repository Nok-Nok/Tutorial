// 34. Find First and Last Position of Element in Sorted Array

/**
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
 */
// Time Complexity: O(log n) since we do binary search to find the target, then binary search for left bound and another binary search for right bound
// Space Compleixty: O(1) since we only use points, no caching or recursion
function searchRange(nums: number[], target: number): number[] {
  // First find the target
  let l = 0;
  let r = nums.length - 1;
  let m: number = 0;
  while (l <= r) {
    m = Math.floor((l + r) / 2);
    if (nums[m] === target) break;
    else if (nums[m] > target) r = m - 1;
    else l = m + 1;
  }
  if (nums[m] !== target) return [-1, -1];
  return [findLeft(l, m), findRight(m, r)];
  // Find the left border:
  function findLeft(l: number, r: number): number {
    let m: number = 0;
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (nums[m] === target && (m === 0 || nums[m - 1] < target)) break;
      else if (nums[m] < target) l = m + 1;
      else r = m - 1;
    }
    return m;
  }
  // Find the right border:
  function findRight(l: number, r: number): number {
    let m: number = 0;
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (nums[m] === target && (m === nums.length - 1 || nums[m + 1] > target))
        break;
      else if (nums[m] > target) r = m - 1;
      else l = m + 1;
    }
    return m;
  }
}
const nums = [],
  target = 0;
console.log(searchRange(nums, target));
