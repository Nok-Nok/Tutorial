// 128. Longest Consecutive Sequence

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
// Time Complexity: O(n)
// Space Complexity: O(n)
function longestConsecutive(nums: number[]): number {
  // Construct a set to arrange all number
  const set = new Set(nums);

  let maxLength = 0;
  // Loop through the nums array
  for (const num of nums) {
    // If found the start of the consecutive, find the left
    if (!set.has(num - 1)) {
      // Look for the end
      let endNum: number = num + 1;
      while (set.has(endNum)) endNum++;
      // Update maxLength
      maxLength = Math.max(maxLength, endNum - num);
    }
  }
  return maxLength;
}

const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log(longestConsecutive(nums));
