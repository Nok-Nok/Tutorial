// Reorder List
/**
 * You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
 

Constraints:

The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function reorderList(head) {
  // FIND MIDPOINT OF LINKEDLIST
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // Firsthalf is from head to midpoint, and secondHalf is from midpoint+1 to end
  let firstHalf = head;
  let secondHalf = slow.next;
  slow.next = null;

  // REVERSE SECOND HALF
  let reverse = null;
  let cur = secondHalf;
  while (cur) {
    // Append node to the reverse list
    const next = cur.next;
    cur.next = reverse;
    // Update pointer
    reverse = cur;
    cur = next;
  }

  // CONNECT THE TWO PORTIONS
  const Dummy = new ListNode();
  cur = Dummy;
  while (reverse) {
    // Connect to firstHalf
    cur.next = firstHalf;
    // Update the firstHalf pointer
    firstHalf = firstHalf.next;
    // Connect to reverse secondHalf
    cur.next.next = reverse;
    // Update the secondHalf & current pointers
    reverse = reverse.next;
    cur = cur.next.next;
  }
  // Connext to the last node in firstHalf if linked list has odd length
  cur.next = firstHalf;
  return Dummy.next;
}

// head = [1, 2, 3, 4];
// const Dummy = new ListNode();
// head.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// head = Dummy.next;
// console.log(reorderList(head));
