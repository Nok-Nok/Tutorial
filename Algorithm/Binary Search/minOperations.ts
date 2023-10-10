// 2009. Minimum Number of Operations to Make Array Continuous

/**
 * You are given an integer array nums. In one operation, you can replace any element in nums with any integer.

nums is considered continuous if both of the following conditions are fulfilled:

All elements in nums are unique.
The difference between the maximum element and the minimum element in nums equals nums.length - 1.
For example, nums = [4, 2, 5, 3] is continuous, but nums = [1, 2, 3, 5, 6] is not continuous.

Return the minimum number of operations to make nums continuous.

 

Example 1:

Input: nums = [4,2,5,3]
Output: 0
Explanation: nums is already continuous.
Example 2:

Input: nums = [1,2,3,5,6]
Output: 1
Explanation: One possible solution is to change the last element to 4.
The resulting array is [1,2,3,5,4], which is continuous.
Example 3:

Input: nums = [1,10,100,1000]
Output: 3
Explanation: One possible solution is to:
- Change the second element to 2.
- Change the third element to 3.
- Change the fourth element to 4.
The resulting array is [1,2,3,4], which is continuous.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
 */
// Time Complexity: O(nlogn) * 2 for sorting and for binarySearchformax at each positions + O(n) for removing duplication => O(nlogn)
// Time Complexity: O(n) for removing duplicate + O(log n) for sorting => O(n)
function minOperations(nums: number[]): number {
  // Remove the duplicate: Time: O(n) Space: O(n)
  const noDup: number[] = [...new Set(nums)];
  // Sort the duplciate-free array: Time: O(nlogn) Space: O(logn)
  const sortedNums = noDup.sort((a, b) => a - b);
  let result = nums.length;
  // Loop through each index: Time: O(n) Space: O(1)
  for (let l = 0; l < sortedNums.length; l++) {
    // Search for the max value that within the range: Time: O(logn) Space: O(1)
    const maxIndex = binarySearchMax(l, sortedNums[l] + nums.length - 1);
    // Obtain the minimum operations for updating the remaining numbers
    result = Math.min(result, sortedNums.length - (maxIndex - l + 1));
  }
  // Return the min operation for update + remove duplication operations
  return result + nums.length - noDup.length;
  function binarySearchMax(l: number, max: number): number {
    let r = sortedNums.length - 1;
    let m = l;
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      // Base case: cur val<=max && at the end or right val>max
      if (
        sortedNums[m] <= max &&
        (m === sortedNums.length - 1 || sortedNums[m + 1] > max)
      )
        break;
      else if (sortedNums[m] > max) r = m - 1;
      else l = m + 1;
    }
    return m;
  }
}
const nums = [8, 5, 9, 9, 8, 4];

console.log(minOperations(nums));
