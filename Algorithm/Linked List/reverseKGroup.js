// Reverse Nodes in k-Group
/**
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
 

Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Time complexity: O(n) where n is the length of the linked list
// Space complexity: O(n/k) where n is length of the linked list and k is the length of each chunk
function reverseKGroup1(head, k) {
  if (k === 1) return head;
  // Grab max k node of the linked list
  let end = head;
  let length = 1;
  while (end && end.next && length < k) {
    end = end.next;
    length++;
  }
  // Reverse the list if there is k-node in the chunk
  if (length === k) {
    const next = end.next;
    end.next = null;
    // Reverse the chunk
    reverseLinkedList(head);
    // Recursive call to reverse the next chunk
    head.next = reverseKGroup(next, k);
    return end;
  }
  // Else return the chunk
  else return head;
}

function reverseLinkedList(head) {
  // Initialize reverseLL
  let reverse = null;

  // Traverse through the list
  while (head) {
    // Obtain the next node
    const next = head.next;
    // Append the list node to the front of reverse
    head.next = reverse;
    // Update two pointers:
    reverse = head;
    head = next;
  }

  return reverse;
}

// Time Complexity: O(n) where n is the length of linked list
// Space Complextiy: O(1)
function reverseKGroup(head, k) {
  // Initialize 2 pointers p1, p2
  let Dummy = new ListNode(0, head);
  let prev = Dummy;
  let p1 = head;
  let p2 = head;
  // Initialize the length of chunk
  let length = 0;

  // Traverse through the linked list
  while (p2) {
    // Update pointer
    p2 = p2.next;
    // Update length & pointer
    length++;

    // If we reach k length, reverse the chunk
    if (length === k) {
      let head = p2;
      const tail = p1;
      // Reverse the chunk
      while (p1 != p2) {
        const next = p1.next;
        p1.next = head;
        // Update pointers
        head = p1;
        p1 = next;
      }
      prev.next = head;
      prev = tail;
      // Reset Length:
      length = 0;
    }
  }
  return Dummy.next;
}

function listNodeConstruct(arr) {
  const Dummy = new ListNode();
  let cur = Dummy;
  arr.forEach((e) => {
    cur.next = new ListNode(e);
    cur = cur.next;
  });
  return Dummy.next;
}
// list1 = listNodeConstruct([1, 2, 3, 4, 5]);
// console.log(reverseKGroup(list1, 2));
// console.log(list1);
// list2 = listNodeConstruct([1, 3, 4]);
// console.log(list2);
// list3 = listNodeConstruct([2, 6]);
// console.log(list3);
// console.log(reverseLinkedList(list1));
