// 19. Remove Nth Node From End of List

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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}
// If do two passes, we can reverse the list
// Append and then remove that nth from then end
// Time Complexity: O(n)
// Space Complexity: O(1)
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Get a pointer that is nth point from the beginning
  const dummy = new ListNode(0, head);
  let cur: ListNode | null = dummy;
  let end = head;
  while (n && end) {
    end = end.next;
    n--;
  }
  // if can get to nth point, return null
  if (n) return null;
  // Traverse to end of list to get the node right before nth node
  while (end) {
    cur = cur!.next;
    end = end.next;
  }
  // Remove the nth node
  const next = cur!.next;
  cur!.next = cur!.next!.next;
  next!.next = null;
  return dummy.next;
}

// const list = [1, 2, 3, 4, 5];
// const listNode = new ListNode();
// let p = listNode;
// list.forEach((e) => {
//   (p.next = new ListNode(e)), (p = p.next);
// });

// console.log(removeNthFromEnd(listNode.next, 2));
