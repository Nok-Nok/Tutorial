// 102. Binary Tree Level Order Traversal

/**
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
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
//BFS question
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
// Time Complexity: O(n) since each node we visit once
// Space Complexity: O(n) for the queue to store nodes
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  let queue = [root];
  const result: number[][] = [];
  while (queue.length) {
    const levelNode: TreeNode[] = [];
    const levelVal: number[] = [];
    for (const node of queue) {
      levelVal.push(node.val);
      if (node.left) levelNode.push(node.left);
      if (node.right) levelNode.push(node.right);
    }
    // Update result and queue
    queue = levelNode;
    result.push(levelVal);
  }
  return result;
}
