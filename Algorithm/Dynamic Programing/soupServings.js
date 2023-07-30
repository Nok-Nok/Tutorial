// 808. Soup Servings

/**
 * There are two types of soup: type A and type B. Initially, we have n ml of each type of soup. There are four kinds of operations:

Serve 100 ml of soup A and 0 ml of soup B,
Serve 75 ml of soup A and 25 ml of soup B,
Serve 50 ml of soup A and 50 ml of soup B, and
Serve 25 ml of soup A and 75 ml of soup B.
When we serve some soup, we give it to someone, and we no longer have it. Each turn, we will choose from the four operations with an equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as possible. We stop once we no longer have some quantity of both types of soup.

Note that we do not have an operation where all 100 ml's of soup B are used first.

Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time. Answers within 10-5 of the actual answer will be accepted.

 

Example 1:

Input: n = 50
Output: 0.62500
Explanation: If we choose the first two operations, A will become empty first.
For the third operation, A and B will become empty at the same time.
For the fourth operation, B will become empty first.
So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
Example 2:

Input: n = 100
Output: 0.71875
 

Constraints:

0 <= n <= 109
 */

/**
 * @param {number} n
 * @return {number}
 */
// This is a DP question w/ statistic
// Topdown memoization has issue with stack over flow!
// Space Complexity: O(n2) for caching + O(n) for recursion stack
// Time Complexity: O(4 * n2) -> O(n2)
var soupServings1 = function (n) {
  // Edge case for n to a certain limit!!!
  if (n > 4451) return 1;
  const cache = {};
  const options = [
    [100, 0],
    [75, 25],
    [50, 50],
    [25, 75],
  ];
  return dfs(n, n);
  function dfs(soupA, soupB) {
    // Base Case: If run out of soup A & B, return 0.5
    if (soupA <= 0 && soupB <= 0) return 0.5;
    // Base Case: If run out of soup A only, return 1
    if (soupA <= 0) return 1;
    // Base Case: If run out of soup B only return 0;
    if (soupB <= 0) return 0;
    // Base Case: If in cache, return cache
    const pos = soupA + ',' + soupB;
    if (pos in cache) return cache[pos];

    // Recursive case:
    // We will ahve 4 options
    let result = 0;
    for (const [serveA, serveB] of options) {
      result += dfs(soupA - serveA, soupB - serveB);
    }
    return (cache[pos] = result / 4);
  }
};

// Try DP bottom approach
var soupServings2 = function (n) {
  if (n > 4451) return 1;
  const mod = 25;
  n = Math.floor((n + 24) / 25);
  // Intialize the Dp Array: row -> soup A remaining & col -> soup B remaining
  let dp = new Array(n + 1).fill(0).map((e) => new Array(n + 1).fill(0));

  const options = [
    [100 / mod, 0],
    [75 / mod, 25 / mod],
    [50 / mod, 50 / mod],
    [25 / mod, 75 / mod],
  ];
  // Loop through the soup
  for (let r = n; r >= 0; r--) {
    for (let c = n; c >= 0; c--) {
      let result = 0;
      for (const [serveA, serveB] of options) {
        // Use up both
        if (r + serveA >= n && c + serveB >= n) result += 0.5;
        else if (r + serveA >= n) result += 1;
        else if (c + serveB >= n) result += 0;
        else result += dp[r + serveA][c + serveB];
      }
      dp[r][c] = result / 4;
    }
  }
  return dp[0][0];
};
var soupServings = function (n) {
  if (n > 4451) return 1;
  const mod = 25;
  n = Math.floor((n + 24) / mod);
  // Intialize the Dp Array: row -> soup A remaining & col -> soup B remaining
  let [arr1, arr2, arr3, arr4, newDp] = new Array(5)
    .fill(0)
    .map((e) => new Array(n + 1).fill(0));

  const options = [
    [4, 0],
    [3, 1],
    [2, 2],
    [1, 3],
  ];
  // Loop through the soup
  for (let r = n; r >= 0; r--) {
    const dp = [arr1, arr2, arr3, arr4];
    for (let c = n; c >= 0; c--) {
      let result = 0;
      for (const [serveA, serveB] of options) {
        // Use up both
        if (r + serveA >= n && c + serveB >= n) result += 0.5;
        else if (r + serveA >= n) result += 1;
        else if (c + serveB >= n) result += 0;
        else result += dp[serveA - 1][c + serveB];
      }
      newDp[c] = result / 4;
    }
    [arr1, arr2, arr3, arr4, newDp] = [newDp, arr1, arr2, arr3, arr4];
  }
  return arr1[0];
};

n = 1268;
console.log(soupServings(n));
n = 660295675;
