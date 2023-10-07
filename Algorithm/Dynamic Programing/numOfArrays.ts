// 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons

/**
 * You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:


You should build the array arr which has the following properties:

arr has exactly n integers.
1 <= arr[i] <= m where (0 <= i < n).
After applying the mentioned algorithm to arr, the value search_cost is equal to k.
Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 109 + 7.

 

Example 1:

Input: n = 2, m = 3, k = 1
Output: 6
Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
Example 2:

Input: n = 5, m = 2, k = 3
Output: 0
Explanation: There are no possible arrays that satisify the mentioned conditions.
Example 3:

Input: n = 9, m = 1, k = 1
Output: 1
Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]
 

Constraints:

1 <= n <= 50
1 <= m <= 100
0 <= k <= n
Accepted
40.6K

 */
// May be use math?
// Time Complexity: n * m * k for possible states of the dp, but for each state, we loop through m options for max value => O(n*m2*k)
// Space Complexity: n * m * k for caching and for recursion stack
function numOfArrays(n: number, m: number, k: number): number {
  const MOD = 10 ** 9 + 7;
  const cache = {};
  return dp(0, 0, 0);
  function dp(i: number, curMax: number, curCost: number): number {
    // Base Case
    // If reach the end
    if (i === n) {
      // If reach search cost, return 1 else 0
      return curCost === k ? 1 : 0;
    }
    // If in cache, return cache value
    const pos = i + ',' + curMax + ',' + curCost;
    if (pos in cache) {
      return cache[pos];
    }
    // If exceed search cost, return 0
    if (curCost > k) return 0;

    // Recursive Case
    // Keep the curmax => use value from 1 to curMax => not update Cost => curMax option for the value * dp of next postion keeping the current cost
    let total = (curMax * dp(i + 1, curMax, curCost)) % MOD;

    // Update the curMax => use value from curMax + 1 to the m Max => add 1 to Cost => + dp of the next postion with udpated cost
    for (let newMax = curMax + 1; newMax <= m; newMax++) {
      total += dp(i + 1, newMax, curCost + 1) % MOD;
    }

    return (cache[pos] = total);
  }
}

// Now try using DP array
// Time Complexity: O(n*m2*k)
// Space Complexity: O(n*m*k) for caching dp array
function numOfArrays(n: number, m: number, k: number): number {
  const MOD = 10 ** 9 + 7;
  // Construct the 3D dp array (n * m * k)
  const dp: number[][][] = new Array(n + 1)
    .fill(0)
    .map((e) => new Array(m + 1).fill(0).map((e) => new Array(k + 1).fill(0)));
  // Base case: if reach n, and reach the cost, set that to 1
  for (let num = 0; num <= m; num++) {
    dp[n][num][k] = 1;
  }

  // Recursive Case
  for (let i = n - 1; i >= 0; i--) {
    for (let curMax = m; curMax >= 0; curMax--) {
      for (let curCost = k; curCost >= 0; curCost--) {
        // Keep the curmax => use value from 1 to curMax => not update Cost => curMax option for the value * dp of next postion keeping the current cost
        let total = (curMax * dp[i + 1][curMax][curCost]) % MOD;
        // Update the curMax => use value from curMax + 1 to the m Max => add 1 to Cost => + dp of the next postion with udpated cost
        for (let newMax = curMax + 1; newMax <= m; newMax++) {
          total += (dp[i + 1][newMax][curCost + 1] ?? 0) % MOD;
        }
        dp[i][curMax][curCost] = total % MOD;
      }
    }
  }
  // console.table(dp);
  return dp[0][0][0];
}

// Optimize space
// Time Complexity: O(n*m2*k)
// Space Complexity: O(2*m*k) for caching dp array
function numOfArrays(n: number, m: number, k: number): number {
  const MOD = 10 ** 9 + 7;
  // Construct the 3D dp array ( m * k)
  let dp: number[][] = new Array(m + 1)
    .fill(0)
    .map((e) => new Array(k + 1).fill(0));
  let newDp: number[][] = new Array(m + 1)
    .fill(0)
    .map((e) => new Array(k + 1).fill(0));
  // Base case: if reach n, and reach the cost, set that to 1
  for (let num = 0; num <= m; num++) {
    dp[num][k] = 1;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let curMax = m; curMax >= 0; curMax--) {
      for (let curCost = k; curCost >= 0; curCost--) {
        // Keep the curmax => use value from 1 to curMax => not update Cost => curMax option for the value * dp of next postion keeping the current cost
        let total = (curMax * dp[curMax][curCost]) % MOD;
        // Update the curMax => use value from curMax + 1 to the m Max => add 1 to Cost => + dp of the next postion with udpated cost
        for (let newMax = curMax + 1; newMax <= m; newMax++) {
          total += (dp[newMax][curCost + 1] ?? 0) % MOD;
        }
        newDp[curMax][curCost] = total % MOD;
      }
    }
    [dp, newDp] = [newDp, dp];
  }
  return dp[0][0];
}



const n = 2,
  m = 3,
  k = 1;
console.log(numOfArrays(n, m, k));
