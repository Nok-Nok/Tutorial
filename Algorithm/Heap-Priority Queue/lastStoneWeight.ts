// 1046. Last Stone Weight

/**
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.

 

Example 1:

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
Example 2:

Input: stones = [1]
Output: 1
 

Constraints:

1 <= stones.length <= 30
1 <= stones[i] <= 1000
 */

class MaxQueue<T> {
  constructor(private heap: T[] = []) {}

  // index
  getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }
  getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }
  swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  enqueue(val: T): void {
    // Push the value
    this.heap.push(val);

    // Heapify up
    let curIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(curIndex);

    // While cur node has parent
    while (parentIndex >= 0) {
      // If parent node > cur node, stop
      if (this.heap[parentIndex] >= this.heap[curIndex]) break;
      // Else, swap
      this.swap(curIndex, parentIndex);
      curIndex = parentIndex;
      parentIndex = this.getParentIndex(curIndex);
    }
  }
  dequeue(): T {
    // If heap length <=1, return pop value
    if (this.heap.length <= 1) return this.heap.pop() as T;
    // Replace top with bottom value
    const top = this.heap[0];
    this.heap[0] = this.heap.pop() as T;

    // Heapify down
    let curIndex = 0;
    // while cur node has left child:
    while (this.getLeftChildIndex(curIndex) < this.heap.length) {
      const leftIndex = this.getLeftChildIndex(curIndex);
      const rightIndex = this.getRightChildIndex(curIndex);
      const largerIndex =
        this.heap[rightIndex] > this.heap[leftIndex] ? rightIndex : leftIndex;
      // If child value < cur node value, end search
      if (this.heap[largerIndex] < this.heap[curIndex]) break;
      // Else swap
      this.swap(curIndex, largerIndex);
      curIndex = largerIndex;
    }
    return top;
  }
  toArray(): T[] {
    return this.heap;
  }
  size(): number {
    return this.heap.length;
  }
}

// Time Complexity: O(n) + O(nlogn) ~ O(nlogn)
// Space Complexity: O(n)
function lastStoneWeight(stones: number[]): number {
  const stonesQueue = new MaxQueue<number>();
  // Time Complexity: O(n), Space Complexity for Heap: O(n)
  stones.forEach((stone) => stonesQueue.enqueue(stone));
  // Loop through the heap: Time Complexity:O(n)
  while (stonesQueue.size() > 1) {
    // 2 Dequeue: Time Complexity O (2logn)
    const stone1 = stonesQueue.dequeue();
    const stone2 = stonesQueue.dequeue();
    // Enqueue: Time Complexity O (logn)
    if (stone1 != stone2) stonesQueue.enqueue(stone1 - stone2);
  }
  return stonesQueue.toArray()[0] ?? 0;
}

const stones = [2, 7, 4, 1, 8, 1];
console.log(lastStoneWeight(stones));
