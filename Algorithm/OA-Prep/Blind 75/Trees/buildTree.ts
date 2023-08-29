// 105. Construct Binary Tree from Preorder and Inorder Traversal

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

// function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
//   // Base case: if length is <=1, return the node
//   if (preorder.length === 0) return null;

//   // First value in in order is top/mid val
//   const midVal = preorder[0];
//   // Traverse through the inorder to find the mid val => get the mid index
//   let i = 0;
//   while (inorder[i] !== midVal) i++;
//   // Left portion is left tree
//   // Right portion is right tree
//   return new TreeNode(
//     midVal,
//     buildTree(preorder.slice(1, i + 1), inorder.slice(0, i)),
//     buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
//   );
// }

// Optimize for not using slice method
// Confirm we have unique values
// Time Complexity: O(n) since we visit each value twice
// Space Complexity: O(logn) for recursion stack = height of the tree
function buildTree(
  preorder: number[],
  inorder: number[],
  pS = 0,
  pE = preorder.length - 1,
  iS = 0,
  iE = inorder.length - 1
): TreeNode | null {
  // Base case: if end and start of preorder overlap, no node left => return null
  if (pS > pE) return null;

  // Start value in preOrder is top/mid val
  const midVal = preorder[pS];
  // Traverse through the inorder to find the mid val => get the mid index
  let length = 0;
  while (inorder[iS + length] !== midVal) length++;
  // Left portion is left tree
  // Right portion is right tree
  return new TreeNode(
    midVal,
    buildTree(preorder, inorder, pS + 1, pS + length, iS, iS + length - 1),
    buildTree(preorder, inorder, pS + length + 1, pE, iS + length + 1, iE)
  );
}
