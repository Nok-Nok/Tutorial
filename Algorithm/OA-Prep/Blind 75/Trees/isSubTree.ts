// 572. Subtree of Another Tree

/**
 * Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

Example 1:


Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Example 2:


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
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
// Time Complexity: O(n * m) where n number of node in root, and m is number of node in subroot since for each node in root, we might traverse to confirm if the same tree
// Space Complexity: O(n) for recusion stack of isSubTree + O(m) for recursion stack of isSameTree 

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // base case:
  // if reach end and still not find subroot, return false
  if (!root) return false;

  // Recursive case:
  // If match, seach if same tree
  // If val not match, traverse left and right
  return (
    isSameTree(root, subRoot) ||
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );
}
function isSameTree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Base case: both reach end
  if (!root && !subRoot) return true;
  // If value not match, return false
  if (root?.val != subRoot?.val) return false;
  // Recursive case: match the branch
  return (
    isSameTree(root!.left, subRoot!.left) &&
    isSameTree(root!.right, subRoot!.right)
  );
}
