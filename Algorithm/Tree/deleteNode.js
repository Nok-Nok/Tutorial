// Delete Node in a BST
/**
 * Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.
If the node is found, delete the node.
 

Example 1:


Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

Example 2:

Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.
Example 3:

Input: root = [], key = 0
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-105 <= Node.val <= 105
Each node has a unique value.
root is a valid binary search tree.
-105 <= key <= 105
 

Follow up: Could you solve it with time complexity O(height of tree)?
 */

/**
 * 
 * @param {Searching
DFS:
If cur = key => proceed to delete
If cur<key, and cur has right => traverse right
If cur>key, and cur has left => traverse left
else return the tree


Delete:
If cur does not have left or right => set cur = null
If cur has left, cur = left
else cur = right} root 
 */
function deleteNode(root, key) {
  if (root.val === key && !root.left && !root.right) return [];
  dfs(root, key);
  return root;
  function dfs(root, key) {
    // If root is null, return the tree
    if (!root) return;
    // If cur = key => proceed to delete
    if (root.val === key) {
      // If cur has left, cur = left
      if (root.left) cur = left;
      // else if cur has right, cur = right
      else if (root.right) cur = right;
      // If cur does not have left or right => set cur = null
      else root = null;
      return;
    }
    // If cur<key, and cur has right => traverse right
    else if (root.val < key && root.right) {
      // If right node = key => proceed to delete
      if (root.right === key) {
        _deleteNode(root, root.right, key, false);
      }
      // Else traverse right
      else deleteNode(root.right, key);
    }
    // If cur>key, and cur has left => traverse left
    else if (root.val > key && root.left) {
      // If left node = key => proceed to delete
      if (root.left === key) {
        _deleteNode(root, root.left, key, false);
      }
      // Else traverse left
      else deleteNode(root.left, key);
    }
  }
}

function _deleteNode(root, node, key, deleteLeftNode) {
  // If there is left node, replace with left node
  if (node.left) {
    node.value = node.left.value;
    node.left = node.left.left;
  }
  // Else if there is right node, replace with right node
  else if (node.right) {
    node.value = node.right.value;
    node.right = node.right;
  }
  // Else delete the node
  else delete deleteLeftNode ? root.left : root.right;
}
