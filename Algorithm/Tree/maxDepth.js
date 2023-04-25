// Maximum Depth of Binary Tree
/**
 * Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100
 */

// BFS Approach
// Time Complexity: O(n2) where n is number of nodes in the tree
// Space Complexity: O(m) where m is number of most nodes at a level
function maxDepth1(root) {
  // Evaluate if root is null, then return
  if (!root) return 0;

  // Initialize a queue with root, and level = 1
  const queue = [[root, 1]];

  // Initialize maxLevel
  let maxLevel = 1;

  // Loop while queue is not empty
  while (queue.length) {
    // Shift out the first node in queue
    const [node, level] = queue.shift();
    // Update maxLevel
    maxLevel = level;
    // If node has left node, push left node and increase level
    if (node.left) queue.push([node.left, level + 1]);
    // If node has right node, push right node and increase level
    if (node.right) queue.push([node.right, level + 1]);
  }
  return maxLevel;
}

// DFS Approach
// Time Complexity: O(n) where n is number nodes in the tree
// Space Complexity: O(h) where h is the max height of the tree
function maxDepth(root) {
  // Base case:
  // if root is null, return 0
  if (!root) return 0;

  // Recursive case:
  // Return the maxDepth of left and right node  + 1
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
