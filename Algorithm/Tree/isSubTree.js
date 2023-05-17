// Subtree of Another Tree

/**
 * Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

Example 1:


Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Example 2:


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
 

Constraints:

The number of nodes in the root tree is in the range [1, 2000].
The number of nodes in the subRoot tree is in the range [1, 1000].
-104 <= root.val <= 104
-104 <= subRoot.val <= 104
 */
// Time complexity: O(n*m) where n is number of nodes in the root and m is number of nodes in subroot since for every node in root, we will check max of m times to see if they match with subroot nodes
// Space complexity: O(m+n)where n is number of nodes in the root and m is number of nodes in subroot. Explanation: we will have a call stack of m * isSubtree. For each time we invoke isSubtree, we will add another n * isSametree to check if root and subrootNodes are matching. So at max, we will have m+n function in the call stack
function isSubtree(root, subRoot) {
  // Base case: If reach to end of root, return false
  if (!root) return false;
  // Recursive case: Check if current root match with sub root. Else compare left and right branch
  return (
    isSameTree(root, subRoot) ||
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );

  function isSameTree(root, subRoot) {
    // Base Case: If both root and subRoot are null, return true
    if (!root && !subRoot) return true;
    // Base Case: If value at root not match with subRoot, return false
    if (!root || !subRoot || root.val !== subRoot.val) return false;

    // Recursive case: checking to ensure both left and right are matching
    return (
      isSameTree(root.left, subRoot.left) &&
      isSameTree(root.right, subRoot.right)
    );
  }
}
