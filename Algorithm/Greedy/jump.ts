// 45. Jump Game II

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

// Do DP bottom up approach first
// Time Complexity: O(n2)
// Space Complexity: O(n)
function jump(nums: number[]): number {
  const dp: number[] = new Array(nums.length).fill(Infinity);
  // Intialze: take 0 step to get to final location if we start from final location
  dp[nums.length - 1] = 0;

  for (let i = nums.length - 2; i >= 0; i--) {
    // Num of steps from cur position to the end to the min
    const furthest: number = Math.min(nums.length - 1, i + nums[i]);
    for (let j = i + 1; j <= furthest; j++) {
      dp[i] = Math.min(dp[i], 1 + dp[j]);
    }
  }
  // Return the min step if start position is 0
  return dp[0];
}

// This is a greedy question
function jump(nums: number[]): number {
  let end = 0;
  let start = 0;
  let step = 0;
  while (end < nums.length - 1) {
    let newEnd = end;
    // Start jumping and find the next furthes
    for (let j = start; j <= end; j++) {
      newEnd = Math.max(newEnd, j + nums[j]);
    }
    // Update furstest position
    start = end;
    end = newEnd;
    step++;
  }
  return step;
}

// Time Complexity: O(n)
// Space Complexity: O(1)
function jump(nums: number[]): number {
  // Intialize the range: originally we can jump from position 0 to 0
  let end = 0;
  let newEnd = 0;
  let step = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    // Find the new end
    newEnd = Math.max(newEnd, i + nums[i]);
    // If we reach the cur end, update step and end
    if (i === end) {
      step++;
      end = newEnd;
    }
  }
  return step;
}
const nums = [2, 3, 0, 1, 4];
console.log(jump(nums));
