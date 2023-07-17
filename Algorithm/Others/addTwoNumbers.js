// Add Two Numbers II

/**
 * You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

Example 1:


Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]
Example 2:

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]
Example 3:

Input: l1 = [0], l2 = [0]
Output: [0]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
 

Follow up: Could you solve it without reversing the input lists?
 */

// Traverse through the list,

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// Challenge: Aligning the end without reversing the linked list
// Time Complexity: O(max(l1, l2)): even though traverse each linked list twice, the constant will still be over-run by the length of linkedList. Thus, the time complexity is max length of either l1 or l2.
// Space complexity: O(max (l1, l2)): since I'm using recursion to traverse the linkedList, space complexity will be the max length of either l1 or l2.
var addTwoNumbers = function (l1, l2) {
  //  To align l1 and l2 w/out reversing, traverse first to find lenght of both linked list
  let len1 = linkedListLength(l1);
  let len2 = linkedListLength(l2);
  function linkedListLength(ll) {
    return ll ? 1 + linkedListLength(ll.next) : 0;
  }
  // If mismatch length, switch so that the 1st one is alway longer
  // Add 0 to beginning l1 and l2, just in case we need to sum of beginning node is 10+
  l1 = new ListNode(0, l1);
  l2 = new ListNode(0, l2);
  if (len2 > len1) [l1, l2, len1, len2] = [l2, l1, len2, len1];
  // Traverse through the linked lists
  dfs(l1, l2, len1, len2);
  function dfs(l1, l2, len1, len2) {
    // Align the start point
    if (len1 > len2) {
      dfs(l1.next, l2, len1 - 1, len2);
      // Update l1 for remaining val that does not have corresponding l2
      if (l1.next.val >= 10) {
        l1.next.val -= 10;
        l1.val += 1;
      }
      return;
    }

    // Since starting point has aligned, update current val of l1
    l1.val += l2.val;
    // If there is next val, traverse to the next vals and also update the current one in l1 as sum exceeds 10
    if (l1.next) {
      dfs(l1.next, l2.next);
      if (l1.next.val >= 10) {
        l1.next.val -= 10;
        l1.val += 1;
      }
    }
  }

  return l1.val ? l1 : l1.next;
};
