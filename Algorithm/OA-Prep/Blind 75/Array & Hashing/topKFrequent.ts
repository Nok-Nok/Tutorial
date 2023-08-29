// 347. Top K Frequent Elements

/**
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */
// Time Complexity: O(3*n)
// Space Complexity: O(n)
function topKFrequent(nums: number[], k: number): number[] {
  // Loop through the nums to get the frequency
  const freqs: Record<number, number> = {};
  for (const num of nums) {
    freqs[num] = (freqs[num] ?? 0) + 1;
  }
  // Group number by frequency
  const numGroups: number[][] = [];
  for (const [num, freq] of Object.entries(freqs)) {
    numGroups[freq] = numGroups[freq] ?? [];
    numGroups[freq].push(Number(num));
  }

  // Obtain the result
  const result: number[] = [];
  for (let i = numGroups.length; i >= 0; i--) {
    if (numGroups[i]) {
      result.push(...numGroups[i]);
      k -= numGroups[i].length;
      if (k === 0) break;
    }
  }
  return result;
}
(nums = [1, 1, 1, 2, 2, 3]), (k = 2);
console.log(topKFrequent(nums, k));
