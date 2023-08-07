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
// This question I use back tracking, but technically we can use DP
// Since this is a back tracking, we are using Catalan number
// Time Complexity: O(n2) for simplicity
// Space Complexity: O(n)
var generateTrees = function (n) {
  return dfs(0, n + 1);
  function dfs(min, max) {
    // If the range for min max differ by 1 => no value in between => return null
    if (max - min <= 1) return [null];
    // Recursive case:
    const result = [];
    // Loop from value between min and max, exclude min & max
    for (let i = min + 1; i < max; i++) {
      const left = dfs(min, i);
      const right = dfs(i, max);
      // Append all left and right branch to the root
      for (const l of left) {
        for (const r of right) {
          result.push(new TreeNode(i, l, r));
        }
      }
    }
    return result;
  }
};
n = 3;
console.log(generateTrees(n).length);
