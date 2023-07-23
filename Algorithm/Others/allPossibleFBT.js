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
Accepted
114.1K
Submissions
142.4K
Acceptance Rate
80.1%
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
// This seems to be a DP problem along w/ tree
// First approach: Top Down w/ memoization
// Time Complexity: O(2^(n/2)) since for each number of node, we will have 2 chocies => 2^n, but we only need to evaluate the odd # of node => 2^(n/2)
// Space Complexity: O(n * 2^(n/2)) for caching since we will cache n times, for each number of node, we may store an array upto 2^(n/2) => n*2^(n/2)
// Additionally, we also use recursion that may add another 2^(n/2) to total space complexity
var allPossibleFBT = function (n) {
  const treeArr = [];
  // Edge case: if n is even, return null
  if (n % 2 === 0) return treeArr;
  // Else: create the root start appending node
  // For this one we can use array for caching since n is just an integer that can be used for index
  const cache = [];
  return dfs(n);
  function dfs(n) {
    // Base Case: if n=1 => return tree node
    if (n === 1) return [new TreeNode()];
    if (cache[n]) return cache[n];
    // Recursive case
    const res = [];
    // Loop through all combinations for left & right
    // f(7) = [{f(1),f(5)}, {f(3), f(3)}, {f(5),f(1)}]
    for (let i = 1; i < n; i += 2) {
      // left + right = n-1
      const left = dfs(i);
      const right = dfs(n - 1 - i);

      // Loop through all combinatios from left
      for (const l of left) {
        // Loop through all combinations from right
        for (const r of right) {
          // Append the left and right to root
          res.push(new TreeNode(0, l, r));
        }
      }
    }
    return (cache[n] = res);
  }
};

n = 19;
console.log(allPossibleFBT(n));
