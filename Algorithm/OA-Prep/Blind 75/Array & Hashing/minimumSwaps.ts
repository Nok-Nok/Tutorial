// 2340. Minimum Adjacent Swaps to Make a Valid Array
/**
 * You are given a 0-indexed integer array nums.

Swaps of adjacent elements are able to be performed on nums.

A valid array meets the following conditions:

The largest element (any of the largest elements if there are multiple) is at the rightmost position in the array.
The smallest element (any of the smallest elements if there are multiple) is at the leftmost position in the array.
Return the minimum swaps required to make nums a valid array.

 

Example 1:

Input: nums = [3,4,5,5,3,1]
Output: 6
Explanation: Perform the following swaps:
- Swap 1: Swap the 3rd and 4th elements, nums is then [3,4,5,3,5,1].
- Swap 2: Swap the 4th and 5th elements, nums is then [3,4,5,3,1,5].
- Swap 3: Swap the 3rd and 4th elements, nums is then [3,4,5,1,3,5].
- Swap 4: Swap the 2nd and 3rd elements, nums is then [3,4,1,5,3,5].
- Swap 5: Swap the 1st and 2nd elements, nums is then [3,1,4,5,3,5].
- Swap 6: Swap the 0th and 1st elements, nums is then [1,3,4,5,3,5].
It can be shown that 6 swaps is the minimum swaps required to make a valid array.
Example 2:
Input: nums = [9]
Output: 0
Explanation: The array is already valid, so we return 0.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
Accepted
9.6K
Submissions

 */
// Time Complexity: O(n)
// Space Complexity: O(1)
function minimumSwaps(nums: number[]): number {
  let max = -Infinity;
  let maxPos: number = 0;
  let min = Infinity;
  let minPos: number = 0;
  // Loop through the array to find the right most Max
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // Update max
    // If cur val >=max, upate max and pos
    if (num >= max) {
      max = num;
      maxPos = i;
    }
  }
  // console.log(maxPos);
  // Loop through the array to find the left most Min
  for (let i = nums.length - 1; i >= 0; i--) {
    const num = nums[i];
    // Update max
    // If cur val <=min, update min and pos
    if (num <= min) {
      min = num;
      minPos = i;
    }
  }
  // console.log(minPos);
  return minPos + (nums.length - 1 - maxPos) - (maxPos < minPos ? 1 : 0);
}
const nums = [3, 4, 5, 5, 3, 1];
console.log(minimumSwaps(nums));
