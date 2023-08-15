// 86. Partition List

/**
 * Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

 

Example 1:


Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:

Input: head = [2,1], x = 2
Output: [1,2]
 

Constraints:

The number of nodes in the list is in the range [0, 200].
-100 <= Node.val <= 100
-200 <= x <= 200
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
// Time Complexity: O(n) - traverse through the linked list once
// Space Complexity: O(1) - only used pointers and reused the existing nodes
var partition = function (head, x) {
  // Initialize dummy list
  const dummy = new ListNode();
  dummy.next = head;
  // Intialize cur pointer of given linkedlist
  let cur = dummy;
  let next = cur.next;
  // Construct a linked list for value < x:
  const partition = new ListNode();
  // Intialize partiional pointer of the newly created partition linkedList
  let curPar = partition;
  // Traver through the given linked list
  // Construct the partition with values < x
  while (next) {
    // If next val<x
    if (next.val < x) {
      // In given linked list, skip next node
      cur.next = next.next;
      // Connect partition to next
      curPar.next = next;
      // Unlink next node from given linkedlist
      next.next = null;
      // Update pointers
      curPar = curPar.next;
      next = cur.next;
    } else {
      // Update pointers
      cur = cur.next;
      next = cur.next;
    }
  }
  // Patch the partition to the modified given linked list
  curPar.next = dummy.next;
  return partition.next;
};
// (head = [1, 4, 3, 2, 5, 2]), (x = 3);
// dummy = new ListNode();
// cur = dummy;
// for (const num of head) {
//   cur.next = new ListNode(num);
//   cur = cur.next;
// }
// console.log(dummy);
// console.log(partition(dummy.next, x));
