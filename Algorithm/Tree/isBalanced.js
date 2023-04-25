//  Balanced Binary Tree
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
 */

// Time Complexity: O(n) where is number of nodes in the tree
// Space Complexity: O(h) where h is the height of the tree
function isBalanced(root) {
    let balanced = true;
    dfs(root);
    return balanced;
    function dfs(root) {
      // Base Case
      // If root is null, return 0
      if (!root) return 0;
  
      // Recursive Case
      // Obtain left height
      const hL = dfs(root.left);
      // Obtain right height
      const hR = dfs(root.right);
      // Update balanced:
      if (balanced) balanced = Math.abs(hL - hR)<=1;
      // return new height
      return Math.max(hL, hR)+1;
    }
  }
