// 217. Contains Duplicate

/**
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

 

Example 1:

Input: nums = [1,2,3,1]
Output: true
Example 2:

Input: nums = [1,2,3,4]
Output: false
Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
 

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

// Time Complexity: O(n)
// Space Complexity O(n)
function containsDuplicate(nums: number[]): boolean {
  // Intialize a set
  const set: Set<Number> = new Set();
  // Loop through the array
  for (const num of nums) {
    // If in set return true
    if (set.has(num)) return true;
    // Else add to set
    else set.add(num);
  }
  // Return false
  return false;
}

// Another approach
// Time Complexity: O(n)
// Space Complexity O(n)
function containsDuplicate(nums: number[]): boolean {
  const unique: Set<Number> = new Set(nums);
  return unique.size !== nums.length;
}
// Test Case:
const nums1 = [1, 1];
console.log(containsDuplicate(nums1));
const nums2 = [];
console.log(containsDuplicate(nums2));
const nums3 = [1, 2, 3, 4];
console.log(containsDuplicate(nums3));
const nums4 = [1, 2, 3, 4, 5, 2];
console.log(containsDuplicate(nums4));
