// Merge Intervals

/**
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // Sort the intervals by start time ascendingly
  intervals.sort(([start, _], [newStart, __]) => start - newStart);
  // Intiailize a result interval with the first interval
  const result = [intervals[0]];
  // Loop through the current intervals
  for (let i = 1; i < intervals.length; i++) {
    // Extract the current start and end
    const [start, end] = intervals[i];
    // Extract the result start and end
    const [newStart, newEnd] = result.pop();
    // If current happen before result (end<newStart), push to result
    if (end < newStart) result.push([start, end], [newStart, newEnd]);
    // If current happen after result (start>newEnd), push to result
    else if (start > newEnd) result.push([newStart, newEnd], [start, end]);
    // Else if overlapping
    else {
      // Find the minEnd, maxStart and merge
      result.push([Math.min(start, newStart), Math.max(end, newEnd)]);
    }
  }
  return result;
};

intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(merge(intervals));
// intervals = [
//   [1, 4],
//   [4, 5],
// ];
// console.log(merge(intervals));
// intervals = [
//   [2, 3],
//   [4, 5],
//   [6, 7],
//   [8, 9],
//   [1, 10],
// ];
// console.log(merge(intervals));
