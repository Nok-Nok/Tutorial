// House Robber

/**
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400
 */

//  Time Complexity: Exceeded!!!!
function rob1(nums) {
  let maxTotal = -Infinity;
  dfs(nums, 0, 0, false);
  return maxTotal;

  function dfs(nums, i, total, robPrev) {
    // Base case: if index exceed nums, update maxTotal
    if (i === nums.length) return (maxTotal = Math.max(maxTotal, total));

    // Recursive case:
    // Option 1: Rob the house only we did not rob the previous house
    if (!robPrev) {
      dfs(nums, i + 1, total + nums[i], true);
    }
    // Option 2: Not rob the house
    dfs(nums, i + 1, total, false);
  }
}

// Time Complexity:
function rob(nums) {
  // Loop from end of the array,
  for (let i = nums.length - 3; i >= 0; i--) {
    // Since we would need to skip minimum 1 house, we will need to determine if we should go to the immediate allowable house (i+2) or the subsequent one (i+3).
    // The house at 4th location is reachable if we go to the (i+2) house first
    nums[i] += Math.max(nums[i + 2], nums[i + 3] ?? -Infinity);
  }
  // Return the max between the 1st or 2nd house
  return Math.max(nums[0], nums[1] ?? -Infinity);
}

function rob(nums) {
  // Loop from end of the array,
  for (let i = 0; i < nums.length; i++) {
    // At each position, the max your can rob is either the previous house or the current house + the i-2 one.
    nums[i] = Math.max(nums[i] + (nums[i - 2] || 0), nums[i - 1] || 0);
  }
  // Return the max when we reach the last house:
  return nums[nums.length - 1];
}

// nums = [2, 1, 1, 2];
// console.log(rob(nums));
// nums = [2, 7, 9, 3, 1];
// console.log(rob(nums));
// nums = [
//   114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200, 91, 80, 223, 58,
//   170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197, 187, 69,
//   129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240,
// ];
// console.log(rob(nums));
