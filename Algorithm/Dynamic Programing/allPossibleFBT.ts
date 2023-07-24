// 894. All Possible Full Binary Trees

/**
 * Given an integer n, return a list of all possible full binary trees with n nodes. Each node of each tree in the answer must have Node.val == 0.

Each element of the answer is the root node of one possible tree. You may return the final list of trees in any order.

A full binary tree is a binary tree where each node has exactly 0 or 2 children.

 

Example 1:


Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
Example 2:

Input: n = 3
Output: [[0,0,0]]
 

Constraints:

1 <= n <= 20
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
// This is a problem that we will need to use recursion/DP
// Use Bottom up approach with memoization
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
// Time Complexity: Summation of f(i)*f(n-1-i) for i from 1 to n-1 => Catalan number => O(2^(n/2))
// Space Complexity: Since we use cache, which will have n array of O(2^(n/2)) combination => O(n*2^(n/2))
function allPossibleFBT(n: number): Array<TreeNode | null> {
  // Edge Case: if given even nodes, we cant construct the binary tre
  if (n % 2 === 0) return [];
  // Initialize caching
  const cache: { [n: string]: TreeNode[] } = {};
  return dfs(n);
  function dfs(n: number): TreeNode[] {
    // Base case, if n=1, return array of 1 node
    if (n === 1) return [new TreeNode()];
    // Base case, if n in cache, return cache value
    if (n in cache) return cache[n];

    // Recursive case:
    // Initialize result array
    const result: TreeNode[] = [];
    // f(7) = [[f(5),f(1)], [f(3),f(3)], [f(1),f(5)]
    // left + right = n-1
    // Loop through nubmer of nodes to get combination of left and right
    for (let i = 1; i < n; i += 2) {
      // Left combination
      const left: TreeNode[] = dfs(i);
      // Right combination
      const right: TreeNode[] = dfs(n - 1 - i);
      // Merge left & right combination
      // Loop through left comb
      for (const l of left) {
        // Loop through right comb
        for (const r of right) {
          // Merge the two comb
          // Push to the result
          result.push(new TreeNode(0, l, r));
        }
      }
    }
    // Cache and return the result array
    return (cache[n] = result);
  }
}
const n = 3;
console.log(allPossibleFBT(19));
