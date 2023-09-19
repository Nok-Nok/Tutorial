// 973. K Closest Points to Origin

/**
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

 

Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 

Constraints:

1 <= k <= points.length <= 104
-104 <= xi, yi <= 104
 */
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
type MaxDistanceHeapNode = {
  element: [number, number];
  priority: number;
};
// Time Complexity: O(nlog(k)) at each position of n points, perform enqueue or enqueue & dequeue which take logK each operation
// Space Complexity: O(k) for maxDistanceHeap
function kClosest1(points: number[][], k: number): number[][] {
  // Construct a maxHeap that rank base on teh distance
  const maxDistanceHeap = new MaxPriorityQueue<[number, number]>();
  // Loop through the points
  for (const [x, y] of points) {
    // Caculate the distance to the origin
    const distance = Math.sqrt(x * x + y * y);
    // If maxHeap length<k, enqueue
    if (maxDistanceHeap.size() < k) maxDistanceHeap.enqueue([x, y], distance);
    // Else curDistance < top value, dequeue & enqueue
    else if (
      distance < (maxDistanceHeap.front() as MaxDistanceHeapNode).priority
    ) {
      maxDistanceHeap.dequeue();
      maxDistanceHeap.enqueue([x, y], distance);
    }
  }
  // console.log(maxDistanceHeap.toArray());
  return (maxDistanceHeap.toArray() as MaxDistanceHeapNode[]).map(
    ({ element }) => element
  );
}

// Time Complexity: O(nLogn) for sort the points by distance + O(k<n) for slicing to get result array => O(nlogn)
// Space Complexity: O(logn) for sorting + O(k<n) for slicing to get result array => O(k)
function kClosest(points: number[][], k: number): number[][] {
  points.sort((a, b) => calculateDistance(a) - calculateDistance(b));
  return points.slice(0, k);
}
function calculateDistance(pos: number[]): number {
  return pos[0] ** 2 + pos[1] ** 2;
}
const points = [
    [3, 3],
    [5, -1],
    [-2, 4],
    [4, 4],
  ],
  k = 2;
console.log(kClosest(points, k));
