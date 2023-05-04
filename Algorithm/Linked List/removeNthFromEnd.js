// Remove Nth Node From End of List
/**
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.

 

Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
 

Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 

Follow up: Could you do this in one pass?
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// Time Complexity: O(n) where n is the length of the linkedList
// Space Complexity: O(1)
function removeNthFromEnd(head, n) {
  const Dummy = new ListNode(0, head);
  let pre = Dummy;
  let cur = head;
  while (cur) {
    cur = cur.next;
    n ? n-- : (pre = pre.next);
  }
  pre.next = pre.next.next;
  return Dummy.next;
}

// head = [1, 2, 3, 4];
// const Dummy = new ListNode();
// head.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// head = Dummy.next;
// console.log(removeNthFromEnd(head, 4));
