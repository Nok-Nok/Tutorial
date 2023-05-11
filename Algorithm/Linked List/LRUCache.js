// LRU Cache
/**
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
 */

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
}

function ListNode(key, val, prev, next) {
  this.val = val;
  this.key = key;
  this.prev = prev || null;
  this.next = next || null;
}

/**
 * @param {number} capacity
 */
// The LRUCache will have a max capacity
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = {};
  this.length = 0;
  this.linkedList = new DoublyLinkedList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (key in this.cache) {
    // Move the node to end of linked list
    const node = this.cache[key];
    // Obtain and prev and next nodes:
    const { next, prev } = node;
    if (!next) {
      // Remove the node from linked list by connect the next and prev node
      // If there is no previous node, move the head to next node:
      next.prev = prev;
      prev ? (prev.next = next) : (this.linkedList.head = next);
      // Attach the node to end of the linkedList and assign tail
      node.next = null;
      node.prev = this.linkedList.tail;
      this.linkedList.tail.next = node;
      this.linkedList.tail = node;
    }
    return this.cache[key].val;
  } else return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // Append the node to the end of linkedList
  const node = new ListNode(key, value, this.linkedList.tail);
  if (!this.linkedList.head) {
    this.linkedList.tail = this.linkedList.head = node;
  } else {
    this.linkedList.tail.next = node;
    this.linkedList.tail = node;
  }
  // Add the key value to cache
  // If key already exist, remove that node from linkedlist and update cache
  if (key in this.cache) {
    // Remove node from linkedList
    const previousNode = this.cache[key];
    const { prev, next } = previousNode;
    // If previousNode is a head node, reassign head
    if (!prev) {
      this.linkedList.head = next;
      next.prev = null;
    }
    // Else if previousNode is in the middle, connect next and prev
    else {
      next.prev = previousNode.prev;
      prev.next = previousNode.next;
    }
    // Detach the node
    previousNode.next = null;
    previousNode.prev = null;
    // Update cache
    this.cache[key] = node;
    return;
  }

  // If has not reached max capacity, add to cache
  this.cache[key] = node;
  if (this.length < this.capacity) {
    this.length++;
  }
  // Otherwise, remove the least recently used (the head)
  else {
    // Update cache:
    const key = this.linkedList.head.key;
    delete this.cache[key];
    // Update linkedList
    this.linkedList.head = this.linkedList.head.next;
    this.linkedList.head.prev = null;
  }
};

// const LRU = new LRUCache(2);
// LRU.put(2, 1);
// LRU.put(1, 1);
// LRU.put(2, 3);
// LRU.put(4, 1);
// console.log(LRU.linkedList);
// console.log(LRU.cache)
// console.log(LRU.length);
// // console.log(LRU.cache);
// // console.log(LRU.linkedList);
// console.log(LRU.get(1));
// // console.log(LRU.linkedList);
// console.log(LRU.get(2));
// console.log(LRU.linkedList);
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
