// Construct Binary Tree from Preorder and Inorder Traversal

/**
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

 

Example 1:


Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]
 

Constraints:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder and inorder consist of unique values.
Each value of inorder also appears in preorder.
preorder is guaranteed to be the preorder traversal of the tree.
inorder is guaranteed to be the inorder traversal of the tree.
 */

function buildTree1(preorder, inorder) {
  // If no values in preorder or inorder, return null
  if (!preorder.length | !inorder.length) return null;

  const root = new TreeNode(preorder[0]);

  // Look for value in the inorder to partition left and right portion
  const mid = inorder.indexOf(preorder[0]);
  // Build left & right branches
  root.left = buildTree(preorder.slice(1, 1 + mid), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  // Return root
  return root;
}

function buildTree(preorder, inorder, preorderStart = 0) {
  // If no values in preorder or inorder, return null
  if (!preorder.length | !inorder.length) return null;

  const root = new TreeNode(preorder[preorderStart]);

  // Look for value in the inorder to partition left and right portion
  const mid = inorder.indexOf(preorder[preorderStart]);
  // Build left & right branches
  root.left = buildTree(preorder, inorder.slice(0, mid), preorderStart + 1);
  root.right = buildTree(
    preorder,
    inorder.slice(mid + 1),
    preorderStart + mid + 1
  );
  // Return root
  return root;
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
(preorder = [3, 9, 20, 15, 7]), (inorder = [9, 3, 15, 20, 7]);
console.log(buildTree(preorder, inorder));
