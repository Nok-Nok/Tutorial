// 55. Jump Game

/**
 * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 105
Accepted
1.5M
Submissions
3.8M

 */

// Time Complexity: O(n)
// Space Complexity: O(1)
function canJump(nums: number[]): boolean {
  // Get the 1st number of step
  let max: number = nums[0];
  // Loop through till the max range include the last index
  let i: number = 0;
  while (max < nums.length - 1) {
    // Find the next new range:
    let newMax: number = max;
    while (i <= max) {
      if (i + nums[i] > newMax) newMax = i + nums[i];
      i++;
    }
    // If newMax đid not change, return false
    if (newMax === max) return false;
    // Else; update the range
    max = newMax;
  }
  return true;
}

// Try DP approach first
// Top Down Approach
// Time complexity: O(n2)
// Space complexity: O(n)
function canJump(nums: number[]): boolean {
  const dp: boolean[] = new Array(nums.length).fill(false);
  dp[0] = true;
  // loop the array
  let i = 0;
  while (i < nums.length - 1 && dp[i]) {
    for (let j = i; j <= i + nums[i] && j < nums.length; j++) {
      dp[j] = true;
    }
    i++;
  }
  return dp[nums.length - 1];
}

// Bottom up approach
// Time complexity: O(n2)
// Space complexity: O(n)
function canJump(nums: number[]): boolean {
  const dp: boolean[] = new Array(nums.length).fill(false);
  dp[nums.length - 1] = true;
  // Loop from the end
  for (let i = nums.length - 2; i >= 0; i--) {
    // Furthest Jump = min of last index or i+nums[i]
    const furthest = Math.min(nums.length - 1, i + nums[i]);
    // Loop from cur position to furthest, if any step land in true, set cur to true and break
    for (let j = i + 1; j <= furthest; j++) {
      if (dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }
  // If we are able to reach the end from the beginning position
  return dp[0];
}
// Time Complexity: O(n)
// Space Complexity: O(1)
function canJump(nums: number[]): boolean {
  // Intialize the start position to reach last index.
  // The first POSIBLE position would the last index
  let startPos: number = nums.length - 1;

  for (let i: number = nums.length - 2; i >= 0; i--) {
    // If we are able to reach that previous start position, update the pos
    if (nums[i] + i >= startPos) startPos = i;
  }
  // Return true if we can start from position 0 and reach the last index
  return startPos === 0;
}
const nums = [1, 2, 3];
console.log(canJump(nums));
