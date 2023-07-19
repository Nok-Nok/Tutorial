// Non-overlapping Intervals

/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

 

Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 

Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
 */
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // Sort the interval by start time
  intervals.sort(([start, _], [newStart, __]) => start - newStart);

  // Get the curStart and End
  let curEnd = -Infinity;
  let count = 0;
  // Loop through the remaining interval
  // Obtain the next start and end
  for (const [nextStart, nextEnd] of intervals) {
    // If cur < next, the current event is not overlapping, move to next event
    if (curEnd <= nextStart) {
      curEnd = nextEnd;
    }
    // Else: overlapping
    else {
      count++;
      curEnd = Math.min(curEnd, nextEnd);
    }
  }
  return count;
};

// intervals = [
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [1, 3],
// ];
// console.log(eraseOverlapIntervals(intervals));
// intervals = [
//   [1, 2],
//   [1, 2],
//   [1, 2],
// ];
// console.log(eraseOverlapIntervals(intervals));
// intervals = [
//   [1, 2],
//   [2, 3],
// ];
// console.log(eraseOverlapIntervals(intervals));

// ------------------------- REVIEW ----------------------------------------
/**
 * @param {number[][]} intervals
 * @return {number}
 */
// Type: Interval Problem
// Time Complexity: Sort => O(nlogn) + Traversing the intervals => O(n) => O(n+nlogn) ~ O(nlogn)
// Space COmplexity: Sort => O(logn)
var eraseOverlapIntervals = function (intervals) {
  // Sort the interval by start time
  intervals.sort(([prevS, _], [curS, __]) => prevS - curS);

  // Initialize a count for removing interval
  let minRemove = 0;
  // Intialize end of prev interval (-Inf)
  let prevE = -Infinity;
  // Loop through the sorted intervals
  for (const [curS, curE] of intervals) {
    // If cur start time < prev end time => overlap
    if (curS < prevE) {
      // Increase remove
      minRemove++;
      // Update prev end time = min(cur end & prev end)
      prevE = Math.min(prevE, curE);
    }
    // Else update prev end time to cur end time
    else prevE = curE;
  }

  // Return count
  return minRemove;
};

// What if sort based on endtime
// Time Complexity: O(nlogn + n)
// Space Complexity: O(logn)
var eraseOverlapIntervals = function (intervals) {
  // Sort the interval by end time
  intervals.sort(([_, prevE], [__, curE]) => prevE - curE);
  // Intialize count for remove
  let minRemove = 0;
  // Initialize prev end time
  let prevE = -Infinity;
  // Loop through the sorted interval
  for (const [curS, curE] of intervals) {
    // If the current interval overlap, remove the interval, otherwise update the new prevE time
    curS < prevE ? minRemove++ : (prevE = curE);
  }
  // Return min num of removed intervals
  return minRemove;
};
