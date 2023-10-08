// 1458. Max Dot Product of Two Subsequences

/**
 * Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.
 

Constraints:

1 <= nums1.length, nums2.length <= 500
-1000 <= nums1[i], nums2[i] <= 1000
Accepted
26.2K
Submissions
51.8K

 */

// Time Complexity: O(n1 * n2) for all states for dp
// Space Complexity: O(n1 * n2) for dp recursion stack and the caching
// Top Down approach
function maxDotProduct(nums1: number[], nums2: number[]): number {
  const cache: Record<number, number> = {};
  let foundPos = false;
  let max = -Infinity;
  const result = dp(0, 0);
  return foundPos ? result : max;
  function dp(i1: number, i2: number): number {
    // Base Case: if either index exceed, return 0
    if (i1 === nums1.length || i2 === nums2.length) return 0;
    const pos = i1 + ',' + i2;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // Op1: skip nums1
    const skipNums1 = dp(i1 + 1, i2);
    // Op2: skip nums2
    const skipNums2 = dp(i1, i2 + 1);
    // Op3: use both
    // How to ensure if we actually have useBoth at least once
    const curProd = nums1[i1] * nums2[i2];
    const useBoth = curProd + dp(i1 + 1, i2 + 1);
    if (!foundPos) {
      foundPos = curProd >= 0;
      max = Math.max(max, curProd);
    }
    return (cache[pos] = Math.max(skipNums1, skipNums2, useBoth));
  }
}

// Bottom up approach using array
// Time Complexity: O(n1 * n2) for looping through both arrays to get all combinations
// Space Complexity: O(n1 * n2) for the dp array
function maxDotProduct1(nums1: number[], nums2: number[]): number {
  // Construct dp array
  const dp: number[][] = new Array(nums1.length + 1)
    .fill(0)
    .map((e) => new Array(nums2.length + 1).fill(0));
  // Base Case: if either index exceed, return 0
  // No need to update dp since the dp is initialized with 0
  let foundPos = false;
  let max = -Infinity;
  // Recursive case:
  for (let i1 = nums1.length - 1; i1 >= 0; i1--) {
    for (let i2 = nums2.length - 1; i2 >= 0; i2--) {
      // Op1: skip nums1
      const skipNums1 = dp[i1 + 1][i2];
      // Op2: skip nums2
      const skipNums2 = dp[i1][i2 + 1];
      // Op3: use both
      // How to ensure if we actually have useBoth at least once
      const curProd = nums1[i1] * nums2[i2];
      const useBoth = curProd + dp[i1 + 1][i2 + 1];
      if (!foundPos) {
        foundPos = curProd >= 0;
        max = Math.max(max, curProd);
      }
      dp[i1][i2] = Math.max(skipNums1, skipNums2, useBoth);
    }
  }
  console.table(dp);
  return foundPos ? dp[0][0] : max;
}

// Bottom up approach using array with optimize space
// Time Complexity: O(n1 * n2) for looping through both arrays to get all combinations
// Space Complexity: O(Math.min(n1,n2)) for the dp array
function maxDotProduct(nums1: number[], nums2: number[]): number {
  // Ensure we get the min length for the dp array
  if (nums1.length > nums2.length) return maxDotProduct(nums2, nums1);
  // Construct dp array
  let dp: number[] = new Array(nums2.length + 1).fill(0);
  let newDp: number[] = new Array(nums2.length + 1).fill(0);
  // Base Case: if either index exceed, return 0
  // No need to update dp since the dp is initialized with 0
  let foundPos = false;
  let max = -Infinity;
  // Recursive case:
  for (let i1 = nums1.length - 1; i1 >= 0; i1--) {
    for (let i2 = nums2.length - 1; i2 >= 0; i2--) {
      // Op1: skip nums1
      // Op2: skip nums2
      // Op3: use both
      // How to ensure if we actually have useBoth at least once
      const curProd = nums1[i1] * nums2[i2];
      const useBoth = curProd + dp[i2 + 1];
      if (!foundPos) {
        foundPos = curProd >= 0;
        max = Math.max(max, curProd);
      }
      newDp[i2] = Math.max(dp[i2], newDp[i2 + 1], useBoth);
    }
    [dp, newDp] = [newDp, dp];
  }
  // console.table(dp);
  return foundPos ? dp[0] : max;
}
const nums1 = [-1, -1],
  nums2 = [1, 1];
console.log(maxDotProduct(nums1, nums2));
