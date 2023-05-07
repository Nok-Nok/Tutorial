function BinarySearchTree(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
  
  /*
  
  Find the tallest height of a binary search tree.
  
  Ex. the tallest height of:
  
       4
     /   \
    2     7
   / \     \
  1   3     9
           /
          8
  
  is 3, because the tallest height of the tree connects the numbers 4 - 7 - 9 - 8
  and has 3 links.
  
  */
  // Time Complexity: O(n) where n is the number of nodes in the tree
  // Space Complexity: O(h) where h is the height of the tree
  const bstHeight = (root, height = -1) => {
    if (!root) return height;
    return (
      1 + Math.max(bstHeight(root.left, height), bstHeight(root.right, height))
    );
  };
  
  /*
    Extension:
  
    Write a function to see if a binary tree is "superbalanced".
    An empty tree is balanced. A non-empty binary tree T is balanced if:
      1) Left subtree of T is balanced
      2) Right subtree of T is balanced
      3) The difference between heights of left subtree and right subtree is not more than 1.
    example: http://www.geeksforgeeks.org/wp-content/uploads/balanced_tree.GIF
  
    A superbalanced tree is a tree that is balanced at every subtree level as well.
  
    Ex. 
          4                       4
        /   \                   /   \
       2     7                2       7
      / \     \             /  \     /  \
     1   3     9           1    3   5    9
              /                         /
             8                         8
  
    The tree on the left is balanced - height of left side is 2, height of right side is 3.
    But, it is not superbalanced since for the 7 subtree, height of left is 0, height of right is 2.
    
    The tree on the right is superbalanced since the difference in height is not more than 1 at any given subtree.
   */
  // Time Complexity: O(n) where n number of node in tree
  // Space Complexity: O(h) where h is the height of the tree
  const superbalanced = (root) => {
    let balanced = true;
    dfs(root);
    return balanced;
    function dfs(root) {
      if (!root) return 0;
  
      const left_H = dfs(root.left);
      let right_H = -Infinity;
      if (balanced) {
        right_H = dfs(root.right);
        balanced = left_H - right_H < 2;
      }
      return 1 + Math.max(left_H, right_H);
    }
  };
  
  // const tree = new BinarySearchTree(10);
  // tree.left = new BinarySearchTree(5);
  // tree.left.left = new BinarySearchTree(3);
  // tree.left.right = new BinarySearchTree(6);
  // tree.right = new BinarySearchTree(14);
  // console.log(tree);
  // console.log(superbalanced(tree));
  