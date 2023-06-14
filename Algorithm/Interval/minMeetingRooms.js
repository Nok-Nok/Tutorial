// Meeting Rooms II

/**
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

 

Example 1:

Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Example 2:

Input: intervals = [[7,10],[2,4]]
Output: 1
 

Constraints:

1 <= intervals.length <= 104
0 <= starti < endi <= 106
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  // Sort the interval by start time
  intervals.sort(([curStart, _], [nextStart, __]) => curStart - nextStart);

  let rooms = [[Infinity, -Infinity]];
  let maxRooms = 0;
  // Loop through the interval:
  for (const [curStart, curEnd] of intervals) {
    // If not overlap, pop till no overlap
    while (rooms.length && rooms[rooms.length - 1][1] <= curStart) {
      rooms.pop();
    }
    // If overlap, push the room in but order of the end time
    rooms.push([curStart, curEnd]);
    rooms.sort(([_, curEnd], [__, nextEnd]) => nextEnd - curEnd);
    // console.log(rooms);
    maxRooms = Math.max(maxRooms, rooms.length);
  }
  return maxRooms;
};

var minMeetingRooms = function (intervals) {
  // Sort the interval by start time
  intervals.sort(([curStart, _], [nextStart, __]) => curStart - nextStart);

  const roomsEnd = [];
  let maxRooms = 0;
  // Loop through the interval:
  for (const [curStart, curEnd] of intervals) {
    // If not overlap, pop till there is an overlap
    while (roomsEnd.length && roomsEnd[roomsEnd.length - 1] <= curStart) {
      roomsEnd.pop();
    }
    // If overlap, push the room in but order of the end time
    roomsEnd.push(curEnd);
    roomsEnd.sort((curEnd, nextEnd) => nextEnd - curEnd);
    // console.log(roomsEnd);
    // Update max rooms
    maxRooms = Math.max(maxRooms, roomsEnd.length);
  }
  return maxRooms;
};

intervals = [
  [0, 30],
  [5, 10],
  [15, 20],
];
console.log(minMeetingRooms(intervals));
intervals = [
  [7, 10],
  [2, 4],
];
console.log(minMeetingRooms(intervals));
intervals = [
  [1, 8],
  [6, 20],
  [9, 16],
  [13, 17],
];
console.log(minMeetingRooms(intervals));
