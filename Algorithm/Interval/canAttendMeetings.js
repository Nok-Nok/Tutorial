//  Meeting Rooms

/**
 * Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

 

Example 1:

Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
Example 2:

Input: intervals = [[7,10],[2,4]]
Output: true
 

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti < endi <= 106
 */

var canAttendMeetings = function (intervals) {
  // Sort the intervals by start time
  intervals.sort(([curStart, _], [nextStart, __]) => curStart - nextStart);
  let curEnd = -Infinity;
  for (const [nextStart, nextEnd] of intervals) {
    // If overlap return false
    if (nextStart < curEnd) return false;
    // Else, return assign end time
    curEnd = nextEnd;
  }
  return true;
};

// intervals = [
//   [0, 30],
//   [5, 10],
//   [15, 20],
// ];
// console.log(canAttendMeetings(intervals));
