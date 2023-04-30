// Remove Duplicates from Sorted List II

/**
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Example 2:


Input: head = [1,1,1,2,3]
Output: [2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Time complexity: O(n) where n is number of node in linkedList
// Space complexity: O(1)
function deleteDuplicates(head) {
  // Initalize a cache for duplicate value
  const duplicate = new Set();
  // Initialize dummy, prev and cur pointers
  const dummy = new ListNode(0, head);
  let prev = dummy;
  let cur = head;
  // traverse through the linked list
  while (cur) {
    // Update cache
    duplicate.add(cur.val);
    // Move to next node
    cur = cur.next;
    // if duplicate found
    if (cur && duplicate.has(cur.val)) {
      // Traverse till not see the duplicate
      while (cur && duplicate.has(cur.val)) cur = cur.next;
      // Delete the duplicate chain
      prev.next = cur;
    } else {
      // Move the prev pointer
      prev = prev.next;
    }
  }
  // Return the updated linkedList
  return dummy.next;
}

// const head = new ListNode(
//   1,
//   new ListNode(
//     2,
//     new ListNode(
//       2,
//       new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5))))
//     )
//   )
// );
// // console.log(head);

// console.log(deleteDuplicates(head));
