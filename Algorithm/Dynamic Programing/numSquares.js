// 279. Perfect Squares

/**
 * Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

 

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
 

Constraints:

1 <= n <= 104
 */

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const cache = {};
  return dfs(n);
  function dfs(remaining) {
    // Base case: remaining =0 => valid route => return 0
    if (remaining === 0) return 0;
    // Base case: remaining < 0 => invalid route => return Infinity
    if (remaining < 0) return Infinity;
    // Base case: if in cache, return cache
    if (remaining in cache) return cache[remaining];
    // Recursive:
    let max = Math.floor(Math.sqrt(remaining));
    let min = Infinity;
    for (let i = 1; i <= max; i++) {
      min = Math.min(min, 1 + dfs(remaining - i * i));
    }
    return (cache[remaining] = min);
  }
};

var numSquares = function (n) {
  const dp = new Array(n + 1).fill(Infinity);
  // Base case: remaining =0 => valid route => return 0
  dp[0] = 0;
  for (let remaining = 1; remaining <= n; remaining++) {
    const squareRoot = Math.floor(Math.sqrt(remaining));
    for (let i = 1; i <= squareRoot; i++) {
      dp[remaining] = Math.min(dp[remaining], 1 + dp[remaining - i * i]);
    }
  }
  return dp[n];
};

n = 12;
console.log(numSquares(n));
