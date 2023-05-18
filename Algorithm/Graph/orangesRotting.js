// Rotting Oranges
/**
 * You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
 */
// This is a graph problem that we use BFS
// Time Complexity: O(n*m) where n*m is the size of the grid
// Space Complexity: O(n*m) where n*m is the size of the grid
function orangesRotting(grid) {
  // Obtain number of rows and cols of the grid
  const row = grid.length;
  const col = grid[0].length;
  // Initialize an array to store all rotten position
  const rotten = [];
  const fresh = new Set();
  // Traverse through the grid to find all position that have rotten oranges
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === 2) rotten.push([r, c]);
      else if (grid[r][c] === 1) fresh.add(r + ',' + c);
    }
  }
  // Initialize a count for minute
  let min = 0;
  // While there is still fresh and still rotten that has not affected others
  while (rotten.length && fresh.size) {
    min++;
    const length = rotten.length;
    //   Loop through the rotten, and update all 4 positions next to it
    for (let i = 0; i < length; i++) {
      [r, c] = rotten.shift();
      //   Left, right, up, down
      rotting(r - 1, c, row, col, grid, rotten, fresh);
      rotting(r + 1, c, row, col, grid, rotten, fresh);
      rotting(r, c - 1, row, col, grid, rotten, fresh);
      rotting(r, c + 1, row, col, grid, rotten, fresh);
    }
  }
  return fresh.size ? -1 : min;
}

function rotting(r, c, row, col, grid, rotten, fresh) {
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  if (rowInBound && colInBound && grid[r][c] === 1) {
    // Update grid value
    grid[r][c] = 2;
    // Update rotten
    rotten.push([r, c]);
    // Update fresh
    fresh.delete(r + ',' + c);
  }
}

// grid = [
//   [2, 1, 1],
//   [1, 1, 0],
//   [0, 1, 1],
// ];
// console.log(orangesRotting(grid));
// grid = [[0, 2]];
// console.log(orangesRotting(grid));
