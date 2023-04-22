// Find First and Last Position of Element in Sorted Array

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

function searchRange1(nums, target) {
  let iL = 0,
    iR = nums.length - 1;
  let iM;
  // Search for target in nums array
  while (iL <= iR) {
    iM = Math.floor((iL + iR) / 2);
    if (nums[iM] === target) break;
    else if (nums[iM] < target) iL = iM + 1;
    else iR = iM - 1;
  }
  if (iL > iR) return [-1, -1];

  // Search for left most index:
  let left_iL = iL,
    left_iR = iM;
  while (left_iL <= left_iR) {
    const left_iM = Math.floor((left_iL + left_iR) / 2);
    if (nums[left_iM] === target) {
      if (left_iM === iL || nums[left_iM - 1] < target) {
        iL = left_iM;
        break;
      } else left_iR = left_iM - 1;
    } else left_iL = left_iM + 1;
  }

  //   Search for right most index:
  let right_iL = iM,
    right_iR = iR;
  while (right_iL <= right_iR) {
    const right_iM = Math.floor((right_iL + right_iR) / 2);
    if (nums[right_iM] === target) {
      if (right_iM === iR || nums[right_iM + 1] > target) {
        iR = right_iM;
        break;
      } else right_iL = right_iM + 1;
    } else right_iR = right_iM - 1;
  }
  return [iL, iR];
}

// SECOND APPROACH
function searchRange(nums, target) {
  return [
    specialBinarySearch(nums, target, true),
    specialBinarySearch(nums, target, false),
  ];
}

function specialBinarySearch(nums, target, goLeft) {
  // Initialize 2 pointers:
  let left = 0;
  let right = nums.length - 1;
  let idx = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // If found target
    if (nums[mid] === target) {
      // Update index
      idx = mid;
      // If searching left most idx, shrink left portion (move right idx)
      // Else if searching right most idx, shrink right portion (move left idx)
      goLeft ? (right = mid - 1) : (left = mid + 1);
    }
    // If less than target
    else if (nums[mid] < target) left = mid + 1;
    // If more that target
    else right = mid - 1;
  }
  return idx;
}

// (nums = [5, 7, 7, 8, 8, 10]), (target = 6);
// console.log(searchRange(nums, target));
// (nums = []), (target = 0);
// console.log(searchRange(nums, target));
// (nums = [5, 7, 7, 8, 8, 8, 10]), (target = 8);
// console.log(searchRange(nums, target));
