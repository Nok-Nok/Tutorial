// 169. Majority Element

/**
 * Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

 

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
 

Constraints:

n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109
 

Follow-up: Could you solve the problem in linear time and in O(1) space?
 */

// O(n) space
// O(n) time
function majorityElement(nums: number[]): number {
  const cache: Map<number, number> = new Map();
  for (const num of nums) {
    cache.set(num, (cache.get(num) ?? 0) + 1);
    if (cache.get(num) > nums.length / 2) return num;
  }
}

// O(1) space Use Boyer-Moore Voting Algorithm
// Note since get to have a guarantee, we are safe here
function majorityElement(nums: number[]): number {
  let candidate: number = Infinity;
  let count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num;
    count += candidate === num ? 1 : -1;
  }
  return candidate;
}
