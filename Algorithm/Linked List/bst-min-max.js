function BinarySearchTree(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}

/*
  
  Given the root of a binary search tree, determine the difference of the maximum
  and minimum value.
  
  Note that the function signature is NOT defined as a method on the
  BinarySearchTree prototype. Instead, we provide the root as an argument to the
  function.
  
  Ex:
  
       4
     /   \
    2     7
   / \     \
  1   3     9
           /
          8
  
  returns 8, becuase 9 - 1 = 8
  
  */
// Time Complexity: O(n) where n is number of node in the tree
// Space Complexity: O(h) where h is the height of the tree
const bstMinMax = (root) => {
  let min = Infinity;
  let max = -Infinity;
  dfs(root);
  return max - min;
  function dfs(root) {
    if (!root) return;
    if (root.value < min) min = root.value;
    if (root.value > max) max = root.value;
    dfs(root.left);
    dfs(root.right);
  }
};

/*
  
  Extension: (not necessarily related in technique to above problem, but
  nevertheless still a BST problem)
  
  Given a binary search tree (BST), find the lowest common ancestor (LCA) of two
  given nodes "p" and "q" in the BST. Return the LCA node itself.
  
  Ex:
  
       4
     /   \
    2     7
   / \     \
  1   3     9
           /
          8
  
  The LCA of node 1 and node 3 is node 2.
  The LCA of node 8 and node 9 is node 9.
  The LCA of node 2 and node 8 is node 4.
  
  */

// Time Complexity: O(n) where n is number of nodes in the tree
// Space Complexity: O(h) where h is the height of the tree
const lowestCommonAncestor = (root, p, q) => {
  if (p.value > q.value) return lowestCommonAncestor(root, q, p);
  return dfs(root, p, q);
  function dfs(root) {
    if (!root) return root;
    if (root.value < p.value) return dfs(root.right);
    if (root.value > q.value) return dfs(root.left);
    return root;
  }
};

