/*
  * Below, you are provided the construtors for a doubly linked list as well as a constructor for the nodes it's composed of
  * Construct a doubly linked list & modify it's prototype to contain methods named 'add' and 'remove'
  * The 'add' method should add an additional node to the end of the doubly linked list
  * The 'remove' method should remove the first instance of a node containing a specific value from the doubly linked list
  
  Example doubly linked list
  null <-> 4 <-> 9 <-> 2 <-> 1 <-> null

  Example after using 'add' method to add 6
  null <-> 4 <-> 9 <-> 2 <-> 1 <-> 6 <-> null

  Example after using 'remove' method to remove 2
  null <-> 4 <-> 9 <-> 1 <-> 6 <-> null

  NOTE: must use non-arrow functions for object constructors and prototype methods
  @see: https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/
*/

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
}

function ListNode(val) {
  this.val = val;
  this.next = null;
  this.prev = null;
}

/*
  This method should add a node to the end of the doubly linked list
   */
DoublyLinkedList.prototype.add = function (val) {
  // Construct node:
  const node = new ListNode(val);

  // If Linked list empty, move head and tail to this pointer
  if (!this.head) {
    this.head = this.tail = node;
  } else {
    // Append to tail.next
    this.tail.next = node;
    // Connect node.prev to tail
    node.prev = this.tail;
    // Move tail
    this.tail = node;
  }
};

/*
  This method should remove the first instance of a node with the inputted value from the doubly linked list
   */
DoublyLinkedList.prototype.remove = function (val) {
  // If first node match, remove first node
  if (this.head.val === val) {
    this.head = this.head.next;
    this.head.prev = null;
    return;
  }
  // Initialize prev and cur pointer
  let prev = this.head;
  let cur = this.head.next;
  while (cur) {
    // If found matching value
    if (cur.val === val) {
      const next = cur.next;
      // Skip cur node:
      prev.next = next;
      // If there is next node
      if (next) {
        next.prev = prev;
      }
      // Else = at the end of the LL, move tail back to prev
      else {
        this.tail = prev;
      }
      return;
    }
    // Update pointers:
    prev = prev.next;
    cur = cur.next;
  }
};
// const ll = new DoublyLinkedList();
// console.log(ll);
// ll.add(1);
// ll.add(2);
// ll.add(3);
// ll.add(4);
// ll.add(2);
// console.log(ll);
// console.log(ll.remove(2));
