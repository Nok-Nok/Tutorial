// 124. Binary Tree Maximum Path Sum

/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

 

Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 

Constraints:

The number of nodes in the tree is in the range [1, 3 * 104].
-1000 <= Node.val <= 1000
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
// Time Complexity: O(n) where n is number of nodes
// Space complexity: O(n) if the tree is skewed
function maxPathSum(root: TreeNode | null): number {
  let max: number = -Infinity;
  dfs(root);
  return max;
  function dfs(node): number {
    // Base case: if reach end of the tree, return 0
    if (!node) return 0;

    // Recursive case:
    // Max path = max (cur+left, cur+right, cur+left+right)
    const left: number = Math.max(0, dfs(node.left));
    const right: number = Math.max(0, dfs(node.right));
    const cur: number = node.val;
    // Update max path
    max = Math.max(cur + left + right, max);
    return cur + Math.max(left, right);
  }
}
