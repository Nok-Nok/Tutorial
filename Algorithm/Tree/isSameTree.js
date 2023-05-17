// Same Tree

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

// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(h) where h is the height of the tree
function isSameTree(p, q) {
  // Base case: if both reach null, return true
  if (!p && !q) return true;
  //   Base case: if value not match, return false
  if (!p || !q || p.val !== q.val) return false;

  // Recursive case
  // Traverse through the tree
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
// function TreeNode(val, left, right) {
//   this.val = val === undefined ? 0 : val;
//   this.left = left === undefined ? null : left;
//   this.right = right === undefined ? null : right;
// }
// // const tree = new TreeNode(1, )
