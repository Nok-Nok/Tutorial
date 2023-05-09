/**
 *
 * First, create a Stack which contains the following methods:
 * - push: add value to top (end) of stack
 * - pop: remove value from top (end) of stack
 *
 * Second, create a Queue which consists of two stacks: stack1 and stack2
 * and contains the following methods:
 * - enqueue: add value to queue
 * - dequeue: remove value from queue
 * Queue methods should follow First In, First Out rule.
 *
 * DO NOT USE NATIVE JS METHODS
 *
 */

function Stack() {
  this.stack = {};
  this.length = 0;
}
Stack.prototype.push = function (val) {
  this.stack[this.length++] = val;
  return this.length;
};

Stack.prototype.pop = function () {
  this.length--;
  const poppedItem = this.stack[this.length];
  delete this.stack[this.length];
  return poppedItem;
};
// const myStack = new Stack();
// console.log(myStack);
// myStack.push(1);
// console.log(myStack.pop());

function Queue() {
  this.stack1 = new Stack();
  this.stack2 = new Stack();
}
Queue.prototype.enqueue = function (val) {
  this.stack1.push(val);
  return this.stack1.length;
};
Queue.prototype.dequeue = function () {
  // Reverse the order of item by popping stack1 and pushing to stack2
  let len = this.stack1.length;
  for (let i = 0; i < len; i++) {
    this.stack2.push(this.stack1.pop());
  }

  // Obtain last item in stack2
  const dequeuedItem = this.stack2.pop();

  // Readd all items back to stack 1
  len = this.stack2.length;
  for (let i = 0; i < len; i++) {
    this.stack1.push(this.stack2.pop());
  }
  // Return dequeue item
  return dequeuedItem;
};

// const myQueue = new Queue();
// myQueue.enqueue(1);
// myQueue.enqueue(2);
// myQueue.enqueue(3);
// console.log(myQueue.dequeue());
