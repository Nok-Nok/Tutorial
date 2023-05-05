// Copy List with Random Pointer
/**
 * A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

 

Example 1:


Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
Example 2:


Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
Example 3:



Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
 

Constraints:

0 <= n <= 1000
-104 <= Node.val <= 104
Node.random is null or is pointing to some node in the linked list.
 */

function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// Time Complexity: O(n) where n is the length of the linkedlist
// Space Complexity: for the hash, O(n) where n is the length of the linkedlist
function copyRandomList(head) {
  // Intialize a hash for all the node created in the copy linked list
  const hash = new Map();
  const Dummy = new Node(0, null, null);

  // Traverse through the linkedlist, to make a copy with next pointer
  let cur = head;
  let copy = Dummy;
  while (cur) {
    copy.next = new Node(cur.val);
    hash.set(cur, copy.next);
    // Move two pointers
    cur = cur.next;
    copy = copy.next;
  }

  // Traverse through the linkedlist, to add random pointer to the copy
  cur = head;
  copy = Dummy.next;
  while (cur) {
    copy.random = hash.get(cur.random);
    // Move two pointers:
    cur = cur.next;
    copy = copy.next;
  }
  return Dummy.next;
}

// head = [
//   [7, null],
//   [13, 0],
//   [11, 4],
//   [10, 2],
//   [1, 0],
// ];
// ll = new Node(0, null, null);
// cur = ll;
// console.log(ll);
// for (let i in head) {
//   cur.next = new Node(head[i][0]);
//   cur = cur.next;
// }
// ll.next.random = ll.next.next.next;
// console.log(ll.next);
// console.log(copyRandomList(ll.next));
