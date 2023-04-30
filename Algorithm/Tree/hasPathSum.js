// Path Sum
/**
 * Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

 

Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
Example 3:

Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// Time complexity: O(n) where n is number of nodes
// Space complexity: O(h) where h is heigh of the tree
function hasPathSum(root, targetSum, curSum = 0) {
  // Base Case: root is null, check with target sum
  if (!root) return false;
  // Update the path sum
  curSum += root.val;
  // Base Case: if this is a leaf, check if cur sum match target
  if (!root.left && !root.right) {
    return curSum === targetSum;
  }
  // Else, traverse left and right, update the curSum
  return (
    hasPathSum(root.left, targetSum, curSum) ||
    hasPathSum(root.right, targetSum, curSum)
  );
}

// tree = new TreeNode(
//   5,
//   new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
//   new TreeNode(8, 13, new TreeNode(4, null, 1))
// );
// // console.log(hasPathSum(tree, 22));
// tree = new TreeNode(1, new TreeNode(2));
// console.log(hasPathSum(tree, 1));
// console.log(tree);
