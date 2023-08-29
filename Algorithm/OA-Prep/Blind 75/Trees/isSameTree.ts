// 100. Same Tree

/**
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

 

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 

Constraints:

The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104
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
// Time Complexity: O(2 * Math.min(n,m)) since visit each node in p & q tree once
// Space Complexity: O(Math.min(n,m)) for recursion stack
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Base case:
  // If both are null, return true
  if (!p && !q) return true;
  // if not match, return false
  if (p?.val != q?.val) return false;

  // Recursive case:
  // Check left and right
  return isSameTree(p!.left, q!.left) && isSameTree(p!.right, q!.right);
}
