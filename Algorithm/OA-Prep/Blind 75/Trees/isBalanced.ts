// 110. Balanced Binary Tree

/**
 * Given a binary tree, determine if it is 
height-balanced
.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104
Accepted
1.2M
Submissions

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
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}
// Is balanced is if height left === height right
function isBalanced(root: TreeNode | null): boolean {
  return dfs(root)[1];
  function dfs(root: TreeNode | null): [number, boolean] {
    // if root is null, return 0 and true
    if (!root) return [0, true];

    const [leftH, leftBalanced] = dfs(root.left);
    const [rightH, rightBalanced] = dfs(root.right);
    // If either branch is not balanced or height not match, return false
    // If both blanced, return true and the height
    return [
      Math.max(leftH, rightH) + 1,
      leftBalanced && rightBalanced && Math.abs(leftH - rightH) <= 1,
    ];
  }
}
