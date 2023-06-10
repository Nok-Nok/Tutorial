// Maximum Value at a Given Index in a Bounded Array

/**
 * You are given three positive integers: n, index, and maxSum. You want to construct an array nums (0-indexed) that satisfies the following conditions:

nums.length == n
nums[i] is a positive integer where 0 <= i < n.
abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
The sum of all the elements of nums does not exceed maxSum.
nums[index] is maximized.
Return nums[index] of the constructed array.

Note that abs(x) equals x if x >= 0, and -x otherwise.

 

Example 1:

Input: n = 4, index = 2,  maxSum = 6
Output: 2
Explanation: nums = [1,2,2,1] is one array that satisfies all the conditions.
There are no arrays that satisfy all the conditions and have nums[2] == 3, so 2 is the maximum nums[2].
Example 2:

Input: n = 6, index = 1,  maxSum = 10
Output: 3
 

Constraints:

1 <= n <= maxSum <= 109
0 <= index < n
 */

// Max we can do is start from Min, get to max Value at i, then reduce back
// The highest number is maxSum/2
// Greedy & Binary serach
// Time Complexity: O(log n) where n is the max sum
// Space Complexity: O(1)
function maxValue(n, index, maxSum) {
  // Initialize BS:
  let l = 1;
  let r = maxSum - n + 1;
  // While left and right has not passed:
  while (l <= r) {
    // Caculate the midPoint
    const m = Math.floor((l + r) / 2);
    // Find the minTotal if value at index is m
    const total = findMinTotal(n, index, m);
    // If total=maxSum, return m
    if (total === maxSum) return m;
    // If total<maxSum, search right portion
    if (total < maxSum) l = m + 1;
    // Else search left portion:
    else r = m - 1;
  }
  return findMinTotal(n, index, l) < maxSum ? l : l - 1;
}

function findMinTotal(n, index, max) {
  // Caclculate minLeftTot (sum from 0 -> index)
  let minLeftTot = 0;
  if (max > index) {
    // leftTotal = [max-index, ..., max ]
    minLeftTot = ((2 * max - index) * (index + 1)) / 2;
  } else {
    // leftTotal = [1,...,max] + (index)-(max-1)
    minLeftTot = ((max + 1) * max) / 2 + index - (max - 1);
  }

  // Caclculate minRightTot (sum from index -> n-1)
  let minRightTot = 0;
  if (max > n - 1 - index) {
    // rightTotal = [max-(n-1-index),..., max]
    minRightTot = ((2 * max - (n - 1 - index)) * (n - index)) / 2;
  } else {
    // rightTotal = [1, ..., max] + (n-1-index) - (max-1)
    minRightTot = ((max + 1) * max) / 2 + (n - 1 - index) - (max - 1);
  }
  return minLeftTot + minRightTot - max;
}
// (n = 4), (index = 2), (maxSum = 6);
// console.log(maxValue(n, index, maxSum));
// (n = 6), (index = 1), (maxSum = 10);
// console.log(maxValue(n, index, maxSum));
// (n = 3), (index = 2), (maxSum = 18);
// console.log(maxValue(n, index, maxSum));
// (n = 8), (index = 7), (maxSum = 14);
// console.log(maxValue(n, index, maxSum));
// (n = 4), (index = 0), (maxSum = 4);
// console.log(maxValue(n, index, maxSum));
// console.log(findTotal(5, 4, 3));
