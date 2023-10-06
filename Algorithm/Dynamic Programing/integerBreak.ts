// 343. Integer Break

/**
 * Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.

Return the maximum product you can get.

 

Example 1:

Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.
Example 2:

Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
 

Constraints:

2 <= n <= 58
 */
// LUCKY!!! Math works :)
// Time Complexity: O(n) since the while loop is proportional to the n value
// Sapace Complexity: O(1) since we did not have any caching or recursion
function integerBreak(n: number): number {
  // Edge case: if n <=3, need to break 1 from the n so the result is n-1
  if (n <= 3) return n - 1;

  // Break the number into group of 3 until we get down to 4
  // Logic is that if n>4, n/2 * n/2 = n^2/4 > 4^2/4 > n => we will keep breaking it in group of 3 till we reach below 4 then no more breaking
  let result = 1;
  while (n > 4) {
    result *= 3;
    n -= 3;
  }
  return result * n;
}

// Perform DP: Top Down approach
// Time Complexity: O(n^2) since the height of the tree is proportional to n value and we have 2 choices for reach node (breakOff2 and breakOff3)
// Space Complexity: O(n) for caching and another O(n) for recursion stack
function integerBreak(n: number): number {
  // Edge case: if n <=3, need to break 1 from the n so the result is n-1
  if (n <= 3) return n - 1;
  const cache: number[] = [];
  return dp(n);
  function dp(n: number): number {
    // base case:
    // If n negative, return -1 so the product will be negative
    if (n < 0) return -1;
    // If n<=1, return 1
    if (n <= 1) return 1;
    // If in cache, return
    if (cache[n]) return cache[n];
    // Recursive case: n>=2
    // Option 1: break into 2
    const breakOff2 = 2 * dp(n - 2);
    // Option 2: break into 3
    const breakOff3 = 3 * dp(n - 3);
    return (cache[n] = Math.max(breakOff2, breakOff3));
  }
}

// Perform DP using array
// Time Complexity: O(n) for looping through 3 to n value to compute the max product
// Space Complexity: O(n) for the dp array
function integerBreak(n: number): number {
  // Edge case: if n <=3, need to break 1 from the n so the result is n-1
  if (n <= 3) return n - 1;
  // Initialize dp array
  const dp: number[] = new Array(n + 1).fill(1);
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    // 2 options: Break into 2 vs Break into 3
    dp[i] = Math.max(3 * dp[i - 3], 2 * dp[i - 2]);
  }
  return dp[n];
}

// Perform DP using array optimized
// Time Complexity: O(n) for looping through 3 to n value to compute the max product
// Space Complexity: O(1) since we now only use 3 pointers
function integerBreak(n: number): number {
  // Edge case: if n <=3, need to break 1 from the n so the result is n-1
  if (n <= 3) return n - 1;
  // Intialize the 3 pointers for position 0, 1, 2
  let p0 = 1;
  let p1 = 1;
  let p2 = 2;
  for (let i = 3; i <= n; i++) {
    const newP = Math.max(3 * p0, 2 * p1);
    // Move the pointers:
    p0 = p1;
    p1 = p2;
    p2 = newP;
  }
  return p2;
}
console.log(integerBreak(6));
