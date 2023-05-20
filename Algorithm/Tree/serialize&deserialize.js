// Serialize and Deserialize Binary Tree

/**
 * Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 

Example 1:


Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
Example 2:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-1000 <= Node.val <= 1000
 */

function serialize(root) {
  // Serialize a tree using preorder DFS(middle, left, right)
  // Initialize a serialized string
  let arr = [];
  dfs(root);
  return arr.join(',');
  // Declare a dfs
  function dfs(root) {
    // If root is null, append N
    if (!root) return arr.push('N');
    // Apppend middle, left and right val
    arr.push(root.val);
    dfs(root.left);
    dfs(root.right);
  }
}
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
function deserialize(data) {
  // Deserialize the string and create a tree using preorder DFS (middle, left, right)
  // Make string in to an array, ignore the last element
  data = data.split(',');
  // Intialize a tree with the first value in the array
  let i = 0;
  // DFS
  return dfs();

  // DFS
  function dfs() {
    // If current value is null, update i and return null
    if (data[i] === 'N') {
      i++;
      return null;
    }
    // Construct the node of the current data value and update i
    const node = new TreeNode(Number(data[i++]));
    // Append left and right node
    node.left = dfs();
    node.right = dfs();
    return node;
  }
}
// console.log(deserialize('1,2,N,N,3,4,N,N,5,N,N,'));
