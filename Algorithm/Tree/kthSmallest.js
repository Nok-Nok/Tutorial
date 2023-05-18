// Kth Smallest Element in a BST

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

// Time complexity: O(n) where n is number of nodes in the root
// Space complexity: O(h) where h is the height of the tree, which could n if we have a skewed tree
function kthSmallest(root, k) {
  let result;
  inOrderTraversal(root);
  return result;

  function inOrderTraversal(root) {
    // If there is left node, traverse left
    if (root.left) inOrderTraversal(root.left);

    // After traversing left subtree, current node is smallest
    k--;
    if (k === 0) return (result = root.val);

    // If still have not found kth smallest node and there is right node, traverse right
    if (k && root.right) inOrderTraversal(root.right);
  }
}
