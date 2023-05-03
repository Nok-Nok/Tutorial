// Sliding Window Maximum
/**
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
 */
// Time complexity: O(n) where n is length of nums and assuming shift can be done in constant time
// Space complexity: O(n) where n is length of nums
function maxSlidingWindow(nums, k) {
  const result = [];
  const maxQueue = [];
  // Initialize left point for sliding window
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    // Remove last value from queue until all number are >= nums[r]
    while (maxQueue.length && nums[maxQueue[maxQueue.length - 1]] < nums[r])
      maxQueue.pop();
    // Push position r to maxQueue
    maxQueue.push(r);
    // Remove fist value in queue if <l
    if (maxQueue[0] < l) maxQueue.shift();
    // Update result array
    if (r + 1 >= k) {
      result.push(nums[maxQueue[0]]);
      l++;
    }
  }
  return result;
}

// (nums = [1, 3, -1, -3, 5, 3, 6, 7]), (k = 3);
// console.log(maxSlidingWindow(nums, k));
