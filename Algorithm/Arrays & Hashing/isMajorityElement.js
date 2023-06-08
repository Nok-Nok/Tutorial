// Check If a Number Is Majority Element in a Sorted Array

/**
 * Given an integer array nums sorted in non-decreasing order and an integer target, return true if target is a majority element, or false otherwise.

A majority element in an array nums is an element that appears more than nums.length / 2 times in the array.

 

Example 1:

Input: nums = [2,4,5,5,5,5,5,6,6], target = 5
Output: true
Explanation: The value 5 appears 5 times and the length of the array is 9.
Thus, 5 is a majority element because 5 > 9/2 is true.
Example 2:

Input: nums = [10,100,101,101], target = 101
Output: false
Explanation: The value 101 appears 2 times and the length of the array is 4.
Thus, 101 is not a majority element because 2 > 4/2 is false.
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i], target <= 109
nums is sorted in non-decreasing order.
 */

function isMajorityElement(nums, target) {
  const len = nums.length;
  // Find left
  let left = 0;
  let right = len - 1;
  let midL;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target && (mid === 0 || nums[mid - 1] < target)) {
      midL = mid;
      break;
    }
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  // Find right
  left = 0;
  right = len - 1;
  let midR;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target && (mid === len - 1 || nums[mid + 1] > target)) {
      midR = mid;
      break;
    }
    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
  // Check if right-left is majority
  return midR - midL + 1 > len / 2;
}

(nums = [5, 5, 5, 6, 6, 8]), (target = 5);
console.log(isMajorityElement(nums, target));

(nums = [10, 100, 101, 101]), (target = 101);
console.log(isMajorityElement(nums, target));
