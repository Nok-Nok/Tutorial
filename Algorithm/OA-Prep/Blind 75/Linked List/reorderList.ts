// 143. Reorder List

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
/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  //  Find the mid point => Make into left and right chunks
  const dummy = new ListNode();
  dummy.next = head;
  let slow: ListNode | null = dummy;
  let fast: ListNode | null = dummy;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  if (!slow) return;
  // Partition to left and right
  const right = slow.next;
  slow.next = null;
  const left = head;

  // Reverse right partition
  let reverseRight: ListNode | null = null;
  let cur = right;
  while (cur) {
    const next = cur.next;
    cur.next = reverseRight;
    reverseRight = cur;
    cur = next;
  }

  // Merge left and reverse right:
  cur = left;
  while (reverseRight && cur) {
    const nextL = cur.next;
    const nextR = reverseRight.next;
    cur.next = reverseRight;
    reverseRight.next = nextL;
    // Update
    cur = nextL;
    reverseRight = nextR;
  }
}

const list = [1,2,3];
const listNode = new ListNode();
let p = listNode;
list.forEach((e) => {
  p.next = new ListNode(e);
  p = p.next;
});
