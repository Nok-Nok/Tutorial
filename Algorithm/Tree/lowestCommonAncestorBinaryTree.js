//  Lowest Common Ancestor of a Binary Tree II

/**
 * Given the root of a binary tree, return the lowest common ancestor (LCA) of two given nodes, p and q. If either node p or q does not exist in the tree, return null. All values of the nodes in the tree are unique.

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a binary tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)". A descendant of a node x is a node y that is on the path from node x to some leaf node.

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.
Example 3:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
 

Follow up: Can you find the LCA traversing the tree, without checking nodes existence?
 */

// Requirement: find a node that value is in bettween p and q
// Additional requirement: we might now have p or q in this tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// This is a binary not a binary search tree
// All number are unique
// May use caching and back tracking
// Technique: DFS & Back tracking
// Time Complexity: O(N) where N is number of nodes
// Space Complecity: O(N/H) where H is max height of the tree, it could be N is the tree is heavingly skewed
var lowestCommonAncestor = function (root, p, q) {
  // Edge case
  if (!p || !q) return null;
  // Create a set from p and q val
  const target = new Set([p, q]);
  // Create a has for path
  const path = new Set();
  return dfs(root);
  // Perfrom dfs to find the 1 val in the set
  function dfs(cur) {
    //  Base Case: reach the end => return null
    if (!cur) return cur;
    // Add the current node to the path
    path.add(cur);
    // Base case: if cur val is in the set, find the other one with back tracking?
    if (target.has(cur)) {
      // Remove that node from targetSet
      target.delete(cur);
      // If targetsize is 0, means we found both, return the node
      if (target.size === 0) return cur;
      // Now I have the path, I want to see if any node in this path will lead me to the other value
      for (const node of path) {
        // We know that we always search the left first, remaining area for path to search is the right
        // Only search the right path if the right has not been searched
        // The only node we need to search both side is cur node
        if (!path.has(node.right)) {
          const foundNode = node === cur ? dfs(node) : dfs(node.right);
          if (foundNode) return node;
        }
      }
    }
    // Recursive
    // Search left and right
    const left = dfs(cur.left);
    const right = dfs(cur.right);
    // Back tracking out of the node:
    path.delete(cur);
    return left || right;
  }
};
