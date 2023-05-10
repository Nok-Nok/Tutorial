/*
Write a function mergeRanges that takes an array of meeting time ranges and
returns an array of condensed ranges, merging the overlapping intervals.

Example:

intervals = [[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]]
mergeRanges(intervals); -> [[0, 1], [3, 8], [9, 12]]

intervals = [[8, 10], [15, 18], [1, 3], [2, 6]]
mergeRanges(intervals); -> [[1, 6], [8, 10], [15, 18]]

Do not assume the ranges are in order. The intervals array will have at least
one range in it.

Hint:
Sort the intervals by their start value beforehand! This makes the problem
actually tractable. To do this, use a custom callback for the .sort() method,
described here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
(especially the part about compare numbers instead of strings)

After sorting, think about how to merge the intervals together.

*/
// This is a stack problem
// Time Complexity: O(nlogn + n) = O(nlogn) for sorting the intervals
// Space Complexity: If we don't count the result array, this is an O(1) space complexity.
const mergeRanges = (intervals) => {
  // Sort the start time of the interval ascendingly => O(nlogn)
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  // Initialize array to have the first interval
  const result = [intervals[0]];
  // Traverse through all intervals
  for (const [start, end] of intervals) {
    // Pop the most recent interval from result
    const [prevStart, prevEnd] = result.pop();
    // If there is an overlap, update the interval with max End time
    if (start <= prevEnd) result.push([prevStart, Math.max(end, prevEnd)]);
    // Else (if there is not overlap)
    else {
      // Re-push the previous interval into result array
      result.push([prevStart, prevEnd]);
      // Push the new interval into the result array
      result.push([start, end]);
    }
  }
  return result;
};

// let intervals = [
//   [0, 1],
//   [3, 5],
//   [10, 12],
//   [4, 8],
//   [9, 10],
// ];
// // mergeRanges(intervals);
// intervals = intervals = [
//   [0, 4],
//   [1, 3],
//   [2, 4],
//   [0, 5],
// ];
// mergeRanges(intervals);
