// 235. Lowest Common Ancestor of a Binary Search Tree

/**
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 

Example 1:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.
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

// function lowestCommonAncestor(
//   root: TreeNode | null,
//   p: TreeNode,
//   q: TreeNode
// ): TreeNode | null {
//   // Ensure p<q
//   if (p.val > q.val) return lowestCommonAncestor(root, q, p);
//   return dfs(root);
//   // Perform dfs to find the nod
//   function dfs(root: TreeNode | null): TreeNode | null {
//     // Base case:
//     if (!root) return root;
//     // If val is between p and q, return val
//     if (root.val >= p.val && root.val <= q.val) return root;
//     // Recursive case:
//     // if root<p => traver right
//     return root.val < p.val ? dfs(root.right) : dfs(root.left);
//   }
// }

// Time Complexity: O(n) since each node of root would be visited once
// Space Complexity: O(1)
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  // Ensure p<q
  if (p.val > q.val) return lowestCommonAncestor(root, q, p);
  while (root) {
    // If val is between p and q, return val
    if (root.val >= p.val && root.val <= q.val) return root;
    // if root<p => traver right. Else, traverse left
    root = root.val < p.val ? root.right : root.left;
  }
  return null;
}
