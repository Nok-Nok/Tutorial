// 560. Subarray Sum Equals K

/**
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
 */
// This a two pointers question
// This O(n2) so it will time out: luckily it did not
// Time: O(n2)
// Space:O(n)
function subarraySum(nums: number[], k: number): number {
  // Let try prefix sum
  const prefix = new Array(nums.length).fill(0);
  // prefix[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1];
  }
  console.log(prefix);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (prefix[j] + nums[j] - prefix[i] === k) count++;
    }
  }
  return count;
}
// Time: O(n2)
// Space:O(1)
function subarraySum(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let prefix = 0;
    for (let j = i; j < nums.length; j++) {
      prefix += nums[j];
      if (prefix === k) count++;
    }
  }
  return count;
}

function subarraySum(nums: number[], k: number): number {
  // Initialize the cache, if we reach 0, we will always have 1 option
  const cache: Map<number, number> = new Map([[0, 1]]);

  let sum = 0;
  let count = 0;
  for (const num of nums) {
    sum += num;
    count += cache.get(sum - k) ?? 0;
    cache.set(sum, (cache.get(sum) ?? 0) + 1);
  }
  return count;
}
const nums = [1];
k = 0;
console.log(subarraySum(nums, k));
