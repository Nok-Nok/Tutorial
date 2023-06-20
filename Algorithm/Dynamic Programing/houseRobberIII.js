// House Robber III

/**
 * The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

 

Example 1:


Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
Example 2:


Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
0 <= Node.val <= 104
 */

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
var rob = function (root) {
  const cache = {};
  const result = dfs(root, 0, true);
  console.log(cache);
  return result;
  function dfs(root, pos, rob) {
    // base case: root is null, return 0
    if (!root) return 0;

    // Base case: if in cache, return
    const key = pos + ',' + rob;
    if (key in cache) return cache[key];

    // Recursive case:
    const posLeft = pos * 2 + 1;
    const posRight = pos * 2 + 2;
    // Traverse left:
    const leftSkip = dfs(root.left, posLeft, false);
    const leftRob = dfs(root.left, posLeft, true);
    // Traverse right:
    const rightSkip = dfs(root.right, posRight, false);
    const rightRob = dfs(root.right, posRight, true);
    return (cache[key] = Math.max(
      rob ? root.val + leftSkip + rightSkip : 0,
      Math.max(leftSkip, leftRob) + Math.max(rightSkip, rightRob)
    ));
  }
};

var rob = function (root) {
  return Math.max(...dfs(root));
  // Output: return [robCurrentNode, skipTheNode]
  function dfs(root) {
    // Base case, root is null
    if (!root) return [0, 0];

    // Recursive case:
    // Traverse left & right
    const [robLeft, skipLeft] = dfs(root.left);
    const [robRight, skipRight] = dfs(root.right);

    // 2 options:
    // Option 1: rob current house then skip next one in left and right
    // Option 2: skip the current house => Max(left) + Max(right)
    return [
      root.val + skipLeft + skipRight,
      Math.max(robLeft, skipLeft) + Math.max(robRight, skipRight),
    ];
  }
};
