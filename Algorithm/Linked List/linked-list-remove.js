/*
Write a function to delete the first instance of a node in a singly linked list.
The function should return the deleted node, or undefined if the value was not found.

Example: 
Given a linked list:
 
('a' -> 'b' -> 'c' -> 'b' -> 'd')
 
And given a value, 'b', the linked list after calling your function should look like:

('a' -> 'c' -> 'b' -> 'd')

And the evaluated result would be the removed node with the value of 'b'.

How might you remove a linked list value without adding extra properties to the constructor functions?

*/

// NOTE: needs to be es5 function definition
function LinkedList() {
  this.head = null;
}

// NOTE: needs to be es5 function definition
function Node(val) {
  this.val = val;
  this.next = null;
}

// Space complexity: O(1)
// Time complexity: O(n) since we traverse through the linkedlist length
const linkedListRemove = (ll, val) => {
  // Initialize the dummy
  const dummy = new Node();
  dummy.next = ll.head;
  // Initialize cur and next pointers:
  let cur = dummy;
  let next = cur.next;

  //Traverse through the linked list
  while (next) {
    // if found matching value, remove that node and break loop
    if (next.val === val) {
      cur.next = next.next;
      break;
    }
    // else: update cur pointer
    else cur = next;
    // Update next pointer:
    next = next.next;
  }

  // Update linkedlist:
  ll.head = dummy.next;

  // Return the remove value
  next.next = null;
  return next;
};

/*
  Extension: 
  * Write a function to delete the first instance of a node in a singly linked list with a space complexity of O(1). 
  * Write a function to delete the all instances of a node in a singly linked list.
  
  Example: 
  Given a linked list:
   
  ('a' -> 'b' -> 'd' -> 'c' -> 'd')
   
   And given a value, 'd', the evaluated result of calling your function should be:
  
   ('a' -> 'b' -> 'c')
  
  */

// Space complexity: O(1)
// Time complexity: O(n) since we traverse through the linkedlist length
const linkedListRemoveMultiple = (ll, val) => {
  // Initialize the dummy
  const dummy = new Node();
  dummy.next = ll.head;
  // Initialize cur and next pointers:
  let cur = dummy;
  let next = cur.next;

  //Traverse through the linked list
  while (next) {
    // if found matching value, remove that node and break loop
    if (next.val === val) {
      cur.next = next.next;
    }
    // else: update cur pointer
    else cur = next;
    // Update next pointer:
    next = next.next;
  }

  // Update linkedlist:
  ll.head = dummy.next;

  // Return the remove value
  return ll;
};
