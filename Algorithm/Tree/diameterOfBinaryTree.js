// Diameter of Binary Tree

/**
 * Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

 

Example 1:


Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-100 <= Node.val <= 100
 */
// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(h) hwere h is the height of the tree
function diameterOfBinaryTree(root) {
  // Initialize maxLength
  let maxLength = 0;
  dfs(root);
  return maxLength;
  function dfs(root) {
    // Base case: if root is null, return depth of 0
    if (!root) return 0;

    // Recursive case:
    // Left&right depth
    const left = dfs(root.left);
    const right = dfs(root.right);
    // Update max length
    maxLength = Math.max(maxLength, left + right);
    // Return the maxDepth of the two branches
    return 1 + Math.max(left, right);
  }
}

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

const tree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  null
);

// console.log(tree);
// console.log(diameterOfBinaryTree(tree));
