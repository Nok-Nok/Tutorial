//  Minimum Absolute Difference in BST

/**
 * Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 104].
0 <= Node.val <= 105
 */

// Find the mindiff between cur&left and cur&right

var getMinimumDifference = function (root) {
  let minDiff = Infinity;
  dfs(root);
  return minDiff;
  function dfs(root, min = -Infinity, max = Infinity) {
    // Base case: null, return
    if (!root) return;
    minDiff = Math.min(minDiff, root.val - min, max - root.val);
    // Traverse left
    dfs(root.left, min, root.val);
    // Traverse right
    dfs(root.right, root.val, max);
  }
};
// root = [4, 2, 6, 1, 3];
// console.log(getMinimumDifference(root));
