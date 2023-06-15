// Shortest Path in Binary Matrix

/**
 * Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

 

Example 1:


Input: grid = [[0,1],[1,0]]
Output: 2
Example 2:


Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
Example 3:

Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1
 */
var shortestPathBinaryMatrix = function (grid) {
  const row = grid.length;
  const col = grid[0].length;
  // Edge case: if either starting point of ending point is no 0, return -1
  if (grid[0][0] || grid[row - 1][col - 1]) return -1;
  const visited = new Set();
  return bfs([[0, 0]], row, col, 1);

  function bfs(queue, row, col, pathLength) {
    // Base case: queue is empty, no additional path
    if (!queue.length) return -1;
    // Recursive case:
    // Initialize a newQueue
    const newQueue = [];

    // Loop through queue
    for (const [r, c] of queue) {
      // Base case: out of bound or already visited skip or grid is 1
      const rowInBound = r >= 0 && r < row;
      const colInBound = c >= 0 && c < col;
      const key = r + ',' + c;
      if (!rowInBound || !colInBound || visited.has(key) || grid[r][c] === 1)
        continue;
      // Base case: reach the final des, return the length
      if (r === row - 1 && c === col - 1) return pathLength;
      // Else, update new queue & visited
      visited.add(key);
      newQueue.push(
        [r, c - 1],
        [r, c + 1],
        [r - 1, c],
        [r + 1, c],
        [r - 1, c - 1],
        [r + 1, c + 1],
        [r - 1, c + 1],
        [r + 1, c - 1]
      );
    }
    return bfs(newQueue, row, col, pathLength + 1);
  }
};

var shortestPathBinaryMatrix = function (grid) {
  const row = grid.length;
  const col = grid[0].length;
  return bfs([[0, 0]], row, col, 1);

  function bfs(queue, row, col, pathLength) {
    // Base case: queue is empty, no additional path
    if (!queue.length) return -1;
    // Recursive case:
    // Initialize a newQueue
    const newQueue = [];

    // Loop through queue
    for (const [r, c] of queue) {
      // Base case: out of bound or already visited skip or grid is 1
      const rowInBound = r >= 0 && r < row;
      const colInBound = c >= 0 && c < col;
      if (!rowInBound || !colInBound || grid[r][c]) continue;
      // Base case: reach the final des, return the length
      if (r === row - 1 && c === col - 1) return pathLength;
      // Else, update new queue & and flip the position to mark that we have visited
      grid[r][c] = 1;
      newQueue.push(
        [r, c - 1],
        [r, c + 1],
        [r - 1, c],
        [r + 1, c],
        [r - 1, c - 1],
        [r + 1, c + 1],
        [r - 1, c + 1],
        [r + 1, c - 1]
      );
    }
    return bfs(newQueue, row, col, pathLength + 1);
  }
};

var shortestPathBinaryMatrix = function (grid) {
  const row = grid.length;
  const col = grid[0].length;
  // Edge case: start point is not 0
  if (grid[0][0]) return -1;
  grid[0][0] = 1;
  // Initialize queue
  const queue = [[0, 0, 1]];

  // Intiailize dir:
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  // Loop through queue
  while (queue.length) {
    const [r, c, pathLength] = queue.shift();
    // Base case: reach the final des, return the length
    if (r === row - 1 && c === col - 1) return pathLength;
    // Else, update queue & and flip the position to mark that we have visited
    // Conditional Case: Only push to queue if inbound, and grid is 0
    dir.forEach(([x, y]) => {
      const newR = r + x;
      const newC = c + y;
      const rowInBound = newR >= 0 && newR < row;
      const colInBound = newC >= 0 && newC < col;
      if (rowInBound && colInBound && grid[newR][newC] === 0) {
        queue.push([newR, newC, pathLength + 1]);
        grid[newR][newC] = 1;
      }
    });
  }
  return -1;
};
grid = [
  [0, 1],
  [1, 0],
];
// grid = [[0]];
console.log(shortestPathBinaryMatrix(grid));
