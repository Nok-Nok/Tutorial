function BinarySearchTree(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}

/*
  
  Given the root of a binary search tree, reverse the binary search tree in-place
  and return the root. Reverse the tree so that for each node, every number on the
  left is greater and every number on the right is lesser.
  
  For example, the original tree:
  
       4
     /   \
    2     7
   / \     \
  1   3     9
           /
          8
  
  reverses to:
  
       4
     /   \
    7     2
   /     / \
  9     3   1
   \
    8
  
  Do this in-place, so that we never use the BinarySearchTree constructor to
  create any new nodes in memory.
  
  Note that the function signature is NOT defined as a method on the
  BinarySearchTree prototype. Instead, we provide the root as an argument to the
  function.
  
  */

const bstReverse = (root) => {
  if (!root) return root;

  [root.left, root.right] = [bstReverse(root.right), bstReverse(root.left)];
  return root;
};
// const bst = new BinarySearchTree(10);
// bst.left = new BinarySearchTree(2);
// bst.left.left = new BinarySearchTree(1);
// bst.left.right = new BinarySearchTree(3);
// bst.left.right.right = new BinarySearchTree(4);
// bst.right = new BinarySearchTree(20);
// bst.right.right = new BinarySearchTree(30);
// bst.right.right.left = new BinarySearchTree(27);
// bst.right.right.right = new BinarySearchTree(34);
// console.log(bst);
// bstReverse(bst);
// console.log(bst);
/*
  
  Extension:
  
  Given an array where elements are sorted in ascending order, convert it to a
  height balanced BST.
  
  For this problem, a height-balanced binary tree is defined as a binary tree in
  which the depth of the two subtrees of every node never differ by more than 1.
  
  Ex:
  
  Given the sorted array: [0, 3, 4, 6, 8, 9], the output is:
  
       6 
     /   \
    3     9
   / \   /
  0   4 8
  
  Whenever you have two elements in the middle like [1, 4, 7, 8], always
  prioritize the rightmost value to place at the top of the tree/subtree,
  giving us:
  
      7
     / \
    4   8
   /
  1
  
  (i.e. choose the 7 over the 4 to place at the top of the entire tree, and then
  the 4 over the 1 to place at the top of the left subtree. Hint: look up the
  Math.ceil function)
  
  */

const sortedArrayToBST = (arr, left = 0, right = arr.length - 1) => {
  // Base case if left and right are the same, return single node
  if (left === right) return new BinarySearchTree(arr[left]);
  // Base case: if right < left, return null
  if (right < left) return null;
  // Find mid point
  const mid = Math.round((left + right) / 2);
  // Construct BST based on mid point
  const bst = new BinarySearchTree(arr[mid]);
  // Append left and right branch
  bst.left = sortedArrayToBST(arr, left, mid - 1);
  bst.right = sortedArrayToBST(arr, mid + 1, right);
  // Return BST
  return bst;
};

