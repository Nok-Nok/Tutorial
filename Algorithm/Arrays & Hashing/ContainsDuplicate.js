// Contains Duplicate
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
 */
// Space Complexity: O(n) where n is the # of elements in the array.
// Time Complexity: O(n) where n is the # of elements in the array.
function containsDuplicate(arr) {
  // Create a cache for unique number in the array
  const cached = new Set();

  // Loop through the array
  for (const num of arr) {
    // If the number exist in cache: return true
    if (cached.has(num)) return true;
    // Else add the number to the cache
    else cached.add(num);
  }
  // Return false
  return false;
}
