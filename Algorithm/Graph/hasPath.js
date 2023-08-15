// 490. The Maze

/**
 * There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.

You may assume that the borders of the maze are all walls (see examples).

 

Example 1:


Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
Example 2:


Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: false
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.
Example 3:

Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: false
 

Constraints:

m == maze.length
n == maze[i].length
1 <= m, n <= 100
maze[i][j] is 0 or 1.
start.length == 2
destination.length == 2
0 <= startrow, destinationrow <= m
0 <= startcol, destinationcol <= n
Both the ball and the destination exist in an empty space, and they will not be in the same position initially.
The maze contains at least 2 empty spaces.
 */

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
var hasPath = function (maze, start, destination) {
  const [rS, cS] = start;
  const [rD, cD] = destination;
  const isInBoundAndEmpty = (r, c) => maze[r] && maze[r][c] === 0;
  const visited = new Set();
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  return dfs(rS, cS);
  function dfs(r, c) {
    // Base case
    // If has been visited, return false
    const pos = r + ',' + c;
    if (visited.has(pos)) return false;
    // If found goal, return true
    if (r === rD && c === cD) return true;

    // Recursive case:
    // update visited
    visited.add(pos);
    // Return true if found by going either all the way to the left, right, up, down
    for (const [x, y] of dirs) {
      let newR = r;
      let newC = c;
      // Traverse to the furthest position that is empty and inbound
      while (isInBoundAndEmpty(newR + x, newC + y)) {
        newR += x;
        newC += y;
      }
      if (dfs(newR, newC)) return true;
    }
    // No bactrack here since if we have explored all direction of that visited position and was not able to find a way to reach the goal, this mean we won't want to revisit this position again.
    return false;
  }
};

(maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
]),
  (start = [0, 4]),
  (destination = [4, 4]);
console.log(hasPath(maze, start, destination));
(maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
]),
  (start = [0, 4]),
  (destination = [3, 2]);
console.log(hasPath(maze, start, destination));
