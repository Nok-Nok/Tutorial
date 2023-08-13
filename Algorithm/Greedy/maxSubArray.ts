// 53. Maximum Subarray

/**
 * Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

Accepted
3.3M
Submissions
6.6M
Acceptance Rate
50.3%
 */

// Dynamic/Greedy Approach
// Time Complexity: O(n)
// Space Complexity: O(1)
function maxSubArray(nums: number[]): number {
  let max: number = -Infinity;
  let total: number = 0;
  // Loop through the array
  for (const num of nums) {
    // Get the total
    // If current value > the new total => reset the range
    total = total < 0 ? num : total + num;
    // Update max
    if (total > max) max = total;
  }
  return max;
}

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums));

