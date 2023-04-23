// Top K Frequent Elements

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

function topKFrequent(nums, k) {
  // FIND FREQUENCY OF EACH NUM IN THE NUMS ARRAY
  // Initialize cache for frequency
  const freqs = {};
  // Loop through the nums array
  for (const num of nums) {
    // Count up the frequency
    freqs[num] = (freqs[num] || 0) + 1;
  }

  // FLIP THE FREQUENCY CACHE
  // Initialize a count array
  const count = new Array(nums.length);
  // Loop through the frequency cached
  for (const [num, freq] of Object.entries(freqs)) {
    // Flip pair of frequency and num
    count[freq] ? count[freq].push(num) : (count[freq] = [num]);
  }
  
  // OBTAIN THE K MOST ELEMENTS
  // Initialize the result
  const result = [];
  for (let i = count.length - 1; i >= 0; i--) {
    if (count[i]) {
      for (const num of count[i]) {
        result.push(num);
        if (result.length === k) return result;
      }
    }
  }
}

(nums = [1, 1, 1, 2, 2, 3]), (k = 2);
console.log(topKFrequent(nums, k));
