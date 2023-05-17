// Binary Tree Level Order Traversal

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
Accepted
1.8M
Submissions
2.8M
Acceptance Rate
64.6%
 */
// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(w) where w is the max width of the tree
function levelOrder1(root) {
  const result = [];
  // If empty root, return empty array
  if (!root) return result;

  //  Create a queue to store each depth
  const queue = [[root, 0]];
  // BFS
  while (queue.length) {
    // Grab the node
    const [node, depth] = queue.shift();
    // Update result array
    result[depth] = result[depth] ?? [];
    result[depth].push(node.val);
    // Update queue
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  return result;
}

function levelOrder(root) {
  const result = [];
  // If empty root, return empty array
  if (!root) return result;

  //  Create a queue to store each depth
  const queue = [root];
  // BFS
  while (queue.length) {
    const length = queue.length;
    const level = [];
    // Push all node from current depth to result array
    for (let i = 0; i < length; i++) {
      // Grab the node
      const node = queue.shift();
      // Update result array
      level.push(node.val);
      // Update queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // Update result array
    result.push(level);
  }

  return result;
}
