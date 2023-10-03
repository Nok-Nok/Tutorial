// 1512. Number of Good Pairs
/**
 * Given an array of integers nums, return the number of good pairs.

A pair (i, j) is called good if nums[i] == nums[j] and i < j.

 

Example 1:

Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
Example 2:

Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
Example 3:

Input: nums = [1,2,3]
Output: 0
 

Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100
 */
// Time Complexity: O(n) for looping through nums array once/twice
// Space Complexity: O(n) for caching the frequency
function numIdenticalPairs(nums: number[]): number {
  const frequency = {};
  // Loop thourh the nums to get the frequency
  for (const num of nums) {
    frequency[num] = (frequency[num] ?? 0) + 1;
  }

  // Calculate total using math of pair => if you have 3 hands => you can make 3 * (3-1) /2 unique pairs
  let total = 0;
  for (const num in frequency) {
    total += (frequency[num] * (frequency[num] - 1)) / 2;
  }
  return total;
}
function numIdenticalPairs(nums: number[]): number {
  const frequency = {};
  let total = 0;
  // Loop thourh the nums to get the frequency
  for (const num of nums) {
    frequency[num] = frequency[num] ?? 0;
    total += frequency[num];
    frequency[num] += 1;
  }
  return total;
}
