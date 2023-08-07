// 96. Unique Binary Search Trees

/**
 * Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.

 

Example 1:


Input: n = 3
Output: 5
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 19
 */

// This is a DP question
// Do Top Down Memoization
// Time Complexity: O(n^3)
// Space Complexity: O(n^2) since we will have visit the combination of min and max where min and max range in (0->n). + O(n) for the recursion stack if we have a very skewed tree
function numTrees1(n: number): number {
  const cache = {};
  return dfs(0, n + 1);
  function dfs(min: number, max: number) {
    // Base Case: min and max differ less than 1 => no node value can be in this range => return 1
    if (max - min <= 1) return 1;
    // Base Case: in cache then return cache
    const pos = min + ',' + max;
    if (pos in cache) return cache[pos];
    // Recursive case:
    let tot: number = 0;
    // Loop through min to max, exclude min and max
    for (let i: number = min + 1; i < max; i++) {
      // Obtain left and right branches
      const left = dfs(min, i);
      const right = dfs(i, max);
      // Append left branches and right branches to root, so we would have left * right combinations
      tot += left * right;
    }
    return (cache[pos] = tot);
  }
}
// Perform bottom up DP
// Time Complexity: O(n^3) for looping through the dp with O(n2) and for each position, we also loop from min to max, which add another O(n) => O(n2*n) = O(n3)
// Space Complexity: O(n^2) since we will have visit the combination of min and max where min and max range in (0->n).
function numTrees2(n: number): number {
  // Construct dp array where col/j are max and row/i are min
  const dp = new Array(n + 2).fill(0).map((e) => new Array(n + 2).fill(0));
  // Loop through min
  for (let min = n + 1; min >= 0; min--) {
    for (let max = min; max <= n + 1; max++) {
      // Base Case: min and max differ less than 1 => no node value can be in this range => return 1
      if (max - min <= 1) dp[min][max] = 1;
      // Recursive case:
      else {
        let tot: number = 0;
        for (let i: number = min + 1; i < max; i++) {
          // Append left branches and right branches to root, so we would have left * right combinations
          tot += dp[min][i] * dp[i][max];
        }
        dp[min][max] = tot;
      }
    }
  }
  console.table(dp);
  return dp[0][n + 1];
}

// Space optimized bottom up DP
// Don't think we can optimize space to 1 row since we need to use diagonal
/**
 * For each tree, we will have root + left + right
 * Where left has values 1 -> i-1 => which means we will have i-1 nodes for left
 * and right has values i+1 -> n => which means we will have n-i nodes for right
 * If we merge left and right branches to root, we will have left * right combinations
 * f(i,n) = f(i-1) * f(n-i)
 * For number of nodes (n nodes), we can choose root value from i=1->n
 * => f(n) = Sum of [f(i-1) * f(n-i)] for i=1->n
 */
// Time Complexity: O(n2)
// Space Complexity O(n)
function numTrees(n: number): number {
  // Construct dp array where col/j are min
  const dp = new Array(n + 1).fill(0);
  // Base Case: min and max differ less than 1 => no node value can be in this range => return 1
  dp[0] = 1; //min = 0, max = 1
  dp[1] = 1; //min = 1, max = 1

  // Base case already handle i=1
  for (let i = 2; i <= n; i++) {
    // f(n) = Sum of [f(i-1) * f(n-i)] for i=1->n
    let tot = 0;
    for (let j = 1; j <= i; j++) {
      // f(j,n) = f(j-1) * f(n-j)
      // Since we have i represent n
      tot += dp[j - 1] * dp[i - j];
    }
    dp[i] = tot;
    console.log(dp);
  }
  return dp[n];
}
const n = 3;
console.log(numTrees(n));
