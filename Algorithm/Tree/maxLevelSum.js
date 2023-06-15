// Maximum Level Sum of a Binary Tree

/**
 * Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

 

Example 1:


Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
Example 2:

Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105
 */

// BFS problem
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(w) where w is the max width of the tree
var maxLevelSum = function (root) {
  // Edge case: not root then return
  if (!root) return;
  // Initialize a queue
  let queue = [root];
  // Initialize a max
  let max = -Infinity;
  let maxLevel = 0;
  let level = 0;
  // While queue still have elements
  while (queue.length) {
    // Update level
    level++;
    // Initialize a queue
    const newQueue = [];
    let levelSum = 0;
    // Loop through the current queue
    for (const node of queue) {
      // Update level sum
      levelSum += node.val;
      // Update newQueue (conditionally)
      if (node.left) newQueue.push(node.left);
      if (node.right) newQueue.push(node.right);
    }
    // Reassign queue
    queue = newQueue;
    // Update max & maxLevel
    if (levelSum > max) {
      max = levelSum;
      maxLevel = level;
    }
  }
  return maxLevel;
};
