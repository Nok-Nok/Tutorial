// 98. Validate Binary Search Tree

/**
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left 
subtree
 of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:


Input: root = [2,1,3]
Output: true
Example 2:


Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
Accepted
2M
Submissions
6.3M

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
// Time Complexity: O(n) since we visit each node once
// Space Complexity: O(h/logn) for recursion stack
function isValidBST(
  root: TreeNode | null,
  minVal = -Infinity,
  maxVal = Infinity
): boolean {
  // Base case: if null, return true
  if (!root) return true;
  // If not with min and max, return false
  if (root.val <= minVal || root.val >= maxVal) return false;
  // Recursive case, traverse left and right with updated min max
  return (
    isValidBST(root.left, minVal, root.val) &&
    isValidBST(root.right, root.val, maxVal)
  );
}
