// 621. Task Scheduler

/**
 * Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

 

Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
Example 2:

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
Example 3:

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
 

Constraints:

1 <= task.length <= 104
tasks[i] is upper-case English letter.
The integer n is in the range [0, 100]
 */
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
// Space Complexity: O(26) for frequency object + O(26) for the maxFrequencyHeap + O(26) for nexMaxFrequencyHeap
// Time Complexity: O(t) for construct the frequency object + O(26*log26) for construct maxFrequencyHeap + O(t * (log26 for dequeue + 1 for push + ))
// function leastInterval(tasks: string[], n: number): number {
//   if (n === 0) return tasks.length;
//   // Find the max frequency => build a max heap
//   const frequency = {};
//   tasks.forEach((letter) => (frequency[letter] = (frequency[letter] ?? 0) + 1));
//   let maxFrequencyHeap = MaxPriorityQueue.fromArray<number>(
//     Object.values(frequency)
//   );
//   let length = 0;
//   let idleTime = n + 1;
//   let nextMaxFrequencyHeap: number[] = [];
//   // Iteration till maxFrequencyheap is truely empty
//   while (true) {
//     // console.log(maxFrequencyHeap.toArray(), nextMaxFrequencyHeap);
//     // Grab the letter to top frequency
//     const top = maxFrequencyHeap.dequeue();
//     length++;
//     idleTime--;
//     if (top - 1 != 0) nextMaxFrequencyHeap.push(top - 1);
//     // If the length reach length divisible by n or no more letter to be used, update maxHeap and update length
//     if (idleTime === 0 || maxFrequencyHeap.isEmpty()) {
//       // Update maxHeap
//       while (nextMaxFrequencyHeap.length)
//         maxFrequencyHeap.enqueue(nextMaxFrequencyHeap.pop() as number);
//       // If not letter in heap
//       if (maxFrequencyHeap.isEmpty()) break;
//       // Else update length:
//       length += idleTime;
//       idleTime = n + 1;
//     }
//     // console.log(length);
//   }
//   return length;
// }

// Option 2: use a queue
// t: number of tasks, n: the min idleTime in between
// Time Complexity: O(t) for construct frequency hashmap + O(26log26) for construct maxFrequencyHeap + O(t * n * log(26)) for loop through all character and idleTime in between
// Space Complexity: O(26) for frequency hashmap + O(26) for maxFrequencyHeap + O(min(26, n))
function leastInterval2(tasks: string[], n: number): number {
  if (n === 0) return tasks.length;
  // Obtain task frequency and create a maxheap
  const frequency: Record<string, number> = {};
  tasks.forEach((letter) => (frequency[letter] = (frequency[letter] ?? 0) + 1));
  const maxFrequencyHeap = new MaxPriorityQueue<number>();
  for (const value of Object.values(frequency)) maxFrequencyHeap.enqueue(value);

  // Create a queue:
  const queue: number[] = []; //[nextTimeAvailable, remainingFrequency]

  let time = 0;
  let idleTime = n + 1;
  // Loop till both queue and heap are empty
  while (maxFrequencyHeap.size() || queue.length) {
    time++;
    idleTime--;

    // if heap not empty
    if (maxFrequencyHeap.size()) {
      // Obtain the topFrequency
      const top = maxFrequencyHeap.dequeue() - 1;
      if (top) queue.push(top);
    }
    // if neccessary idleTime has been reached, push all values from the queue
    if (idleTime === 0) {
      while (queue.length) maxFrequencyHeap.enqueue(queue.pop() as number);
      idleTime = n + 1;
    }
  }
  return time;
}

// Option 3: Perform Greedy:
// Intuition: result = tasks length + total idle time
// Time Complexity: O(t) for constructing frequency hashmap + O(26Log26) for sorting the frequency + O(26) for determining the idleTime => O(t)
// Space Complexity: O(26) for constructing frequency hashmap + O(log26) for sorting the frequency => O(1)
function leastInterval(tasks: string[], n: number): number {
  // Obtain the frequency and sort
  const frequency: Record<string, number> = {};
  tasks.forEach((letter) => (frequency[letter] = (frequency[letter] ?? 0) + 1));
  const sortedFrequency = Object.values(frequency).sort((a, b) => a - b);

  // Find the idle time
  const maxFrequency = sortedFrequency.pop() as number;
  let idleTime = (maxFrequency - 1) * n;

  // While there is still idleTime
  while (idleTime > 0 && sortedFrequency.length) {
    idleTime -= Math.min(maxFrequency - 1, sortedFrequency.pop() as number);
  }
  return tasks.length + Math.max(idleTime, 0);
}
const tasks = ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
  n = 2;
console.log(leastInterval(tasks, n));
