// Longest Consecutive Sequence
/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

 

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

function longestConsecutive(nums) {
  // Initialize max length
  let maxLen = 0;
  // Convert the array into a set
  const numsSet = new Set(nums);

  // Loop through the set
  numsSet.forEach((num) => {
    // Determine if the current value is the beginning of a sequence (a.k.a value-1 is not in the set)
    if (!numsSet.has(num - 1)) {
      // Find the end of the squence by increment value by 1. If value+1 not in sequence, find the length
      let end = num + 1;
      while (numsSet.has(end)) end++;
      // Update maxLength
      if (end - num > maxLen) maxLen = end - num;
    }
  });
  return maxLen;
}

nums = [100,4,200,1,3,2];
console.log(longestConsecutive(nums));
