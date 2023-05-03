//  Reverse Linked List
/**
 * Given the head of a singly linked list, reverse the list, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// Iteration Approach
// Time Complexity: O(n) where n is the length of linked list
// Space Complexity: O(1)
function reverseList1(head) {
  let cur = head;
  let reverseHead = null;
  // Traverse through the linked list
  while (cur) {
    // Obtain the next node
    const next = cur.next;
    // Connect the current node to the head of Reverse Linked List
    cur.next = reverseHead;
    // Reassign the pointers:
    reverseHead = cur;
    cur = next;
  }
  return reverseHead;
}

// Recursive Approach
// Time Complexity: O(n) where n is the length of linked list
// Space Complexity: O(n) where n is the length of linked list due to call stack usage for recursion.
function reverseList(head, reverseHead = null) {
  if (!head) return reverseHead;
  // Obtain the next node
  const next = head.next;
  // Connect the current node to the head of Reverse Linked List
  head.next = reverseHead;
  // Reassign the pointers
  return reverseList(next, head);
}
// list = new ListNode(1, new ListNode(2, new ListNode(4)));
// console.log(reverseList(list));
// list = new ListNode();
// console.log(reverseList(null));
