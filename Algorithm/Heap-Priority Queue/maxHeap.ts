/**
 * Arr[(i-1)/2] Returns the parent node.
 * Arr[(2*i)+1] Returns the left child node.
 * Arr[(2*i)+2] Returns the right child node.
 */

class MaxHeap {
  heap: number[];
  constructor() {
    this.heap = [];
  }

  // Get Index:
  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  // Evaluate if has Node:
  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }
  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }
  hasParent(parentIndex: number): boolean {
    return this.getParentIndex(parentIndex) >= 0;
  }

  // Obtain the Node:
  getLeftChild(index: number): number {
    return this.heap[this.getLeftChildIndex(index)] ?? -Infinity;
  }
  getRightChild(index: number): number {
    return this.heap[this.getRightChildIndex(index)] ?? -Infinity;
  }
  getParent(index: number): number {
    return this.heap[this.getParentIndex(index)];
  }

  // Swap nodes:
  swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Peek: to check or find the most prior element in the heap, (max or min element for max and min heap).
  peek(): number | null {
    return this.heap[0] ?? null;
  }

  // Heapify: a process of creating a heap from an array.
  heapifyUp(): void {
    // Start from the bottom:
    let curIndex = this.heap.length - 1;

    // While the current node > its parent node if exist:
    while (this.heap[curIndex] > this.getParent(curIndex)) {
      // Swap the two
      this.swap(curIndex, this.getParentIndex(curIndex));
      curIndex = this.getParentIndex(curIndex);
    }
  }
  heapifyDown(): void {
    let curIndex = 0;
    // While current node still have left child (since we add left before right child)
    while (this.hasLeftChild(curIndex)) {
      // Find the childIndex with the larger value
      const largerChildIndex =
        this.getRightChild(curIndex) > this.getLeftChild(curIndex)
          ? this.getRightChildIndex(curIndex)
          : this.getLeftChildIndex(curIndex);
      // If value of current node > that the child/children, heapifyDown complete => return
      if (this.heap[curIndex] > this.heap[largerChildIndex]) return;
      // Else swap the node and update curIndex
      this.swap(curIndex, largerChildIndex);
      curIndex = largerChildIndex;
    }
  }
  // Insertion: process to insert an element in existing heap time complexity O(log N).
  add(value: number): void {
    this.heap.push(value);
    this.heapifyUp();
  }
  // Deletion: deleting the top element of the heap or the highest priority element, and then organizing the heap and returning the element with time complexity O(log N).
  remove(): number | undefined {
    if (this.heap.length <= 1) return this.heap.pop();
    // Obtain the top value (Max)
    const top = this.heap[0];
    // Replace the top value with the bottom value (popped)
    this.heap[0] = this.heap.pop() as number;
    // Heapify down
    this.heapifyDown();
    // Return the top value:
    return top;
  }
}

const heap = new MaxHeap();
heap.add(9);
heap.add(8);
heap.add(6);
heap.add(5);
heap.add(2);
heap.add(1);
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap);
