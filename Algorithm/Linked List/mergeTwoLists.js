//  Merge Two Sorted Lists
/**
 * You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

 

Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// Time Complexity: O(n+m) where n is length of list1 and m is length of list2
// Space Complexity: O(1)
function mergeTwoLists(list1, list2) {
  const Dummy = new ListNode();
  let cur = Dummy;
  // Traverse till either list1 or list2 out of nodes
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      // Connect merge list to list1
      cur.next = list1;
      // Move cur & list1 pointers
      cur = cur.next;
      list1 = list1.next;
    } else {
      // Connect merge list to list2
      cur.next = list2;
      // Move cur & list2 pointers
      cur = cur.next;
      list2 = list2.next;
    }
  }
  cur.next = list1 || list2;
  return Dummy.next;
}

// const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
// const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
// console.log(list1);
// console.log(list2);
// console.log(mergeTwoLists(list1, list2));
