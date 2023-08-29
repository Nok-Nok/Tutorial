// 21. Merge Two Sorted Lists

/**
 * You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

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

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null) {
//     this.val = val ?? 0;
//     this.next = next ?? null;
//   }
// }

// Time Complexity: O(n+m) total nodes in list 1 and list2
// Space Complexity: O(1)
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let mergeList = new ListNode();
  // Pointer for appending on mergelist
  let p3 = mergeList;
  // Pointer for list1 and list2
  let p1 = list1;
  let p2 = list2;
  // Loop until either list is out
  while (p1 && p2) {
    // If p1 <= p2, append p1
    if (p1.val <= p2.val) {
      p3.next = p1;
      // update pointers
      p3 = p3.next;
      p1 = p1.next;
    }
    // Else, append p2
    else {
      p3.next = p2;
      // Update pointers
      p3 = p3.next;
      p2 = p2.next;
    }
  }
  p3.next = p1 ? p1 : p2;
  return mergeList.next;
}
