// Add Two Numbers
/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// Time Complexity: O(n) where n is the max length of l1 and l2
// Space Compelxity: O(1) if we don't count the ouput linkedlist
function addTwoNumbers(l1, l2) {
  // Create a new linked for sum
  const Dummy = new ListNode(0, l1);
  let cur = Dummy;

  // Traverse through l1 and l2, and add
  let remainder = 0;
  while (l1 || l2) {
    // Find the total
    const total = (l1?.val || 0) + (l2?.val || 0) + remainder;
    cur.next = new ListNode(total % 10);
    remainder = Math.floor(total / 10);

    // Update pointer
    l1 = l1?.next;
    l2 = l2?.next;
    cur = cur.next;
  }
  // If there is still remainder, append the value to end of the linked list
  if (remainder) cur.next = new ListNode(remainder);

  return Dummy.next;
}

// (l1 = [2, 4, 3]), (l2 = [5, 6, 4]);
// Dummy = new ListNode();
// l1.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l1 = Dummy.next;
// Dummy = new ListNode();
// l2.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l2 = Dummy.next;
// console.log(addTwoNumbers(l1, l2));

// (l1 = [0,9]), (l2 = [0, 1,9,9,9]);
// Dummy = new ListNode();
// l1.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l1 = Dummy.next;
// Dummy = new ListNode();
// l2.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l2 = Dummy.next;
// console.log(addTwoNumbers(l1, l2));

// l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9];
// Dummy = new ListNode();
// l1.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l1 = Dummy.next;
// Dummy = new ListNode();
// l2.reduce((prev, cur) => (prev.next = new ListNode(cur)), Dummy);
// l2 = Dummy.next;
// console.log(addTwoNumbers(l1, l2));
