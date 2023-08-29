// 230. Kth Smallest Element in a BST

/**
 * Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

 

Example 1:


Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:


Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
 

Constraints:

The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104
 

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
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
// Time complexity: O(n)
// Space Complexity: O(k)
function kthSmallest(root: TreeNode | null, k: number): number {
  if (!root) return -Infinity;
  const result: number[] = [];
  dfs(root);
  return result[k - 1];
  function dfs(root: TreeNode): void {
    // If there is left node, traverse left to append left node to result
    if (root.left) dfs(root.left);
    // After add all left/smaller node value, add current value
    result.push(root.val);
    if (result.length === k) return;
    // Add the right nodes values, before move up the layer
    if (root.right) dfs(root.right);
  }
}
// Time Complexity: O(n)
// Space Complexity: O(n) for recursion
function kthSmallest(root: TreeNode | null, k: number): number {
  let result = -Infinity;
  if (root) dfs(root);
  return result;
  function dfs(root: TreeNode): void | number {
    // If there is left node, traverse left to append left node to result
    if (root.left) dfs(root.left);
    // After add all left/smaller node value, add current value
    k--;
    if (k === 0) return (result = root.val);

    // Add the right nodes values, before move up the layer
    if (root.right) dfs(root.right);
  }
}

// Try iterative
// Time Complexity: O(n)
// Space Complexity: O(n) for stack caching
function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  while (true) {
    // Push all left node into stack
    while (root) {
      stack.push(root);
      root = root.left;
    }
    // If got to kth smallest val, return the val
    const node = stack.pop();
    k--;
    if (k === 0) return node!.val;
    // Push all right node if applicable
    root = node!.right;
  }
}
