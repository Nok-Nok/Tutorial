// Binary Tree Right Side View
/**
 * Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

 

Example 1:


Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Example 2:

Input: root = [1,null,3]
Output: [1,3]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 */

// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(w) where w is the max width of the tree, which can reach to n/2 => can be simplified to O(n)
function rightSideView(root) {
  const result = [];
  // Base Case: no root => return empty array
  if (!root) return result;

  // Initialize a queue
  const queue = [root];

  // BFS each depth level, get the right most value:
  while (queue.length) {
    // Get length of the current depth level:
    const length = queue.length;

    // Right most value of the current depth level
    let rightMost;
    // Loop through the current depth level:
    for (let i = 0; i < length; i++) {
      // Obtain the node
      const node = queue.shift();
      // Update right most:
      rightMost = node.val;
      // Update queue:
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // Update result array
    result.push(rightMost);
  }
  // Return result:
  return result;
}
