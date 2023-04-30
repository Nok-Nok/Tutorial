//  Minimum Depth of Binary Tree
/**
 * Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 2
Example 2:

Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
 

Constraints:

The number of nodes in the tree is in the range [0, 105].
-1000 <= Node.val <= 1000
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// BFS
// Time complexity: O(n) where n is num of nodes in the tree
// Space complexity:O(w) where w is the width of the tree
function minDepthBFS(root) {
  let level = 0;
  if (!root) return level;

  // Initialize a queue that contain the root
  const queue = [root];

  // While queue is not empty
  while (queue.length) {
    // Update level
    level++;
    let newQueue = [];
    // Loop through all node in queue
    for (const node of queue) {
      // If there is 1 node that does not have left and right, return the current leve
      if (!node.left && !node.right) return level;
      // If there is left/right, push to queue
      if (node.left) newQueue.push(node.left);
      if (node.right) newQueue.push(node.right);
    }
    // Update queue
    queue = newQueue;
  }
}

// DFS
// Time complexity: O(n) where n is number of node in the tree
// Space complexity: O(h) where h is the heigh of the tree
function minDepth(root) {
  // Base Case: if root is null, return 0
  if (!root) return 0;
  // Recursive case: if root has both branch left and right, find the min. Else select only the height of the valid branch
  return root.left && root.right
    ? 1 + Math.min(minDepth(root.left), minDepth(root.right))
    : 1 + minDepth(root.left || root.right);
}

// tree = new TreeNode(
//   2,
//   null,
//   new TreeNode(
//     3,
//     null,
//     new TreeNode(4, null, new TreeNode(5, null, new TreeNode(6)))
//   )
// );
// console.log(minDepth(tree));
// console.log(tree);
// tree = new TreeNode(
//   1,
//   new TreeNode(2, new TreeNode(4), new TreeNode(5)),
//   new TreeNode(3)
// );
// console.log(minDepth(tree));
