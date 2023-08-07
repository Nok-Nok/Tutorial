// 95. Unique Binary Search Trees II

/**
 * Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

 

Example 1:


Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 8
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// Let's do top down memoization first
// Time Complexity: O(n^3)
// Space Complexity: O(n^2) for caching and O(n) for recursion stack
function generateTrees(n: number): Array<TreeNode | null> {
  const cache = {};
  return dfs(1, n);
  function dfs(min: number, max: number): Array<TreeNode | null> {
    // Base case: if max<min, return null
    if (max < min) return [null];
    // Base case: in cache, return cache
    const pos = min + ',' + max;
    if (pos in cache) return cache[pos];

    // Recursive case:
    const result: Array<TreeNode | null> = [];
    // Loop through min max
    for (let i = min; i <= max; i++) {
      // Get left and right branches:
      const left = dfs(min, i - 1);
      const right = dfs(i + 1, max);
      for (const l of left) {
        for (const r of right) {
          result.push(new TreeNode(i, l, r));
        }
      }
    }
    return (cache[pos] = result);
  }
}
// Try bottom up dp
// Time Complexity: O(n^3)
// Space Complexity: O(n^2) for caching
function generateTrees(n: number): Array<TreeNode | null> {
  const dp: (TreeNode | null)[][][] = new Array(n + 1)
    .fill(0)
    .map((e) => new Array(n + 1).fill([null]));

  for (let min = n; min >= 1; min--) {
    // Base case: if max<min, return null
    for (let max = min; max <= n; max++) {
      // Recursive case:
      const result: Array<TreeNode | null> = [];
      // Loop through min max
      for (let i = min; i <= max; i++) {
        // Get left and right branches:
        const left = dp[min][i - 1];
        const right = i + 1 <= n ? dp[i + 1][max] : [null];
        for (const l of left) {
          for (const r of right) {
            result.push(new TreeNode(i, l, r));
          }
        }
      }
      dp[min][max] = result;
    }
  }
  // Return for min=1, max=n
  console.table(dp);
  return dp[1][n];
}

const n = 3;
console.log(generateTrees(n).length);
