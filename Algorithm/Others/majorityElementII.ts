// 229. Majority Element II
/**
 * Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 

Example 1:

Input: nums = [3,2,3]
Output: [3]
Example 2:

Input: nums = [1]
Output: [1]
Example 3:

Input: nums = [1,2]
Output: [1,2]
 

Constraints:

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109
 

Follow up: Could you solve the problem in linear time and in O(1) space?
 */

// Solve with O(n) space first
// Space Complexity: O(n) for caching number and its frequency. The result array won't be counted two the space complexity
// Time Complexity: O(2n) ~ O(n) since we need to traverse the given array to get frequency then traverse the cache which has max length of n if all number are unique
function majorityElement(nums: number[]): number[] {
  const cache: Map<number, number> = new Map();
  const MIN_FREQ = Math.floor(nums.length / 3);
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    cache.set(num, (cache.get(num) ?? 0) + 1);
  }
  for (let [num, freq] of cache) {
    if (freq > MIN_FREQ) result.push(num);
  }
  return result;
}
// How to solve with O(1) space
/** Use Boyer-Moore Voting Algorithm
 * Max 1 majority element > n/2 frequency
 * => Loop through the array, have a count and a king, if value is continue to be king, increase count, else decrese to zero then promote a new king
 * Max 2 majority elements > n/3 frequency
 * => Loop through the array, have 2 count and 2 kings,
 * if meet value, increase the count
 * if the value are from neither king, decrease from both. If one of them is 0, can't reduced further, replace king and reset count to 1
 * Max 3 majority elements > n/4 frequency
 */
function majorityElement(nums: number[]): number[] {
  let king1: number | null = null;
  let count1 = 0;
  let king2: number | null = null;
  let count2 = 0;
  for (const num of nums) {
    // if match increase count
    if (num === king1) count1++;
    else if (num === king2) count2++;
    // if count = 0, replase
    else if (count1 === 0) {
      king1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      king2 = num;
      count2 = 1;
    }
    // Redouce count
    else {
      count1--;
      count2--;
    }
  }

  // Evaluate if the two candidates are good
  const MIN_FREQ = Math.floor(nums.length / 3);
  count1 = 0;
  count2 = 0;
  for (const num of nums) {
    if (num === king1) count1++;
    else if (num === king2) count2++;
  }
  const result: number[] = [];
  if (count1 > MIN_FREQ) result.push(king1 as number);
  if (count2 > MIN_FREQ) result.push(king2 as number);
  return result;
}
