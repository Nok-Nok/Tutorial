function Node(value) {
  this.value = value;
  this.next = null;
}

/**
 * Write a function for reversing a linked list.
 * Your function will have one input: the head of the list
 * Your function should return the new head of the list
 * If the input is null, your function should return null
 *
 * Example:
 * If the linked list is:
 *
 *      1 -> 2 -> 3 -> 4 -> 5
 *
 * The result should like like:
 *
 *      5 -> 4 -> 3 -> 2 -> 1
 *
 * Extension:
 * Do it in place
 *
 */

// Iteration:
// Time Complexity: O(n) where n is number of nodes in the linked list
// Space Complexity: O(1)
const reverseLinkedList1 = (head) => {
  // Initialize the head pointer for reverse linked list
  let reverseHead = null;
  // Loop through the current linked list
  while (head) {
    // Obtain the next part
    const next = head.next;
    // Append the head to the reverse linked list
    head.next = reverseHead;
    // Update the 2 heads
    reverseHead = head;
    head = next;
  }
  // Return the reverse linkedlist
  return reverseHead;
};

// Recursion approach:
// Space Complexity: O(n) for recursion stack where n is number of nodes in the linked list
// Time Complexity: O(n) where n is number of nodes in the linked list
// Default paramater: reverseHead - the head pointer for reverse linked list
const reverseLinkedList = (head, reverseHead = null) => {
  // Base case: If traverse through all the linked list, return the reverse
  if (!head) return reverseHead;
  // Recursive case:
  // Obtain the next part
  const next = head.next;
  // Append the head to the reverse linked list
  head.next = reverseHead;
  // Update the 2 heads
  return reverseLinkedList(next, head);
};
