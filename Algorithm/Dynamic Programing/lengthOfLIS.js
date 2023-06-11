// Longest Increasing Subsequence

/**
 * Given an integer array nums, return the length of the longest strictly increasing 
subsequence
.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
 */
// Time Complexity: O(n logn) where n is length of nums array
// Space Complexity: O(n) where n is length of nums array
function lengthOfLIS(nums) {
  // Intialize a cache to store max length of each num
  const cache = [-Infinity];
  // Loops nums backward:
  for (let i = nums.length - 1; i >= 0; i--) {
    // Obtiain current number
    const num = nums[i];
    // If num is smaller the the last value in cache, means that the length, can be expanded:
    if (num < cache[cache.length - 1]) {
      cache.push(num);
      continue;
    }
    // Else: the value is replaced inside the cached
    // Easier approach, that will get by in interview (O(n))
    for (let j = cache.length - 1; j >= 0; j--) {
      if (j === 0 || cache[j - 1] > num) {
        cache[j] = num;
        break;
      }
    }
    // ----------------- BST APPROACH (log n) ------------------------------
    // // Perform binary search
    // let l = 0;
    // let r = cache.length - 1;
    // // Search for the largest value that is smaller or equal to num is a decreasing array
    // // Search for right-most value <=num
    // while (l <= r) {
    //   // Get the mid point
    //   const m = Math.floor((l + r) / 2);
    //   // If mid val < num (means that all val on the right <num)
    //   // If left val > num, we found the right most val <=num
    //   if (cache[m] <= num && (m === 0 || cache[m - 1] > num)) {
    //     cache[m] = num;
    //     break;
    //   }
    //   // If mid val > num, search right, else search left
    //   if (cache[m] > num) l = m + 1;
    //   else r = m - 1;
    // }
  }
  return cache.length;
}

nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums));
// nums = [18, 55, 66, 2, 3, 54];
// console.log(lengthOfLIS(nums));
