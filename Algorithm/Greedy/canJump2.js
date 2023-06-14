// Jump Game

/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 1000
It's guaranteed that you can reach nums[n - 1].
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  // Initialize result
  let result = 0;
  // Intialize my current position, would be step 0
  let curPos = 0;
  // While current position still has not passed the length of nums
  while (curPos < nums.length - 1) {
    result++;
    // If we just max step and get out of nums, we have reach the result
    if (curPos + nums[curPos] >= nums.length - 1) break;
    // Otherwise, find the next maxStep
    let step = 0;
    let maxPos = curPos;
    for (let j = 0; j <= nums[curPos]; j++) {
      // If found new maxPost, update step and maxPos
      if (maxPos < curPos + j + nums[curPos + j]) {
        maxPos = curPos + j + nums[curPos + j];
        step = j;
      }
    }
    curPos = curPos + step;
  }
  return result;
};

// Redo using simpler logic
var jump = function (nums) {
  // Intialize range for min and maxPos
  let minPos = 0;
  let maxPos = 0;
  // Intialize number of jumps
  let jumpCount = 0;

  // While the maxPos is not at the end of nums
  while (maxPos < nums.length - 1) {
    // Find the nextMaxPos
    let nextMaxPos = 0;
    for (let i = minPos; i <= maxPos; i++) {
      nextMaxPos = Math.max(nextMaxPos, i + nums[i]);
    }
    // Update min and max pos
    minPos = maxPos + 1;
    maxPos = nextMaxPos;
    // Update # of jumps
    jumpCount++;
  }
  return jumpCount;
};

// nums = [2, 3, 1, 1, 4];
// console.log(jump(nums));
// nums = [2, 3, 0, 1, 4];
// console.log(jump(nums));
// nums = [1, 2, 3];
// console.log(jump(nums));
// nums = [3, 2, 1];
// console.log(jump(nums));

// nums = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0];
// console.log(jump(nums));
nums=[1,0]
console.log(jump(nums));

