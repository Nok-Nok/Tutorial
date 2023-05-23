// Max Area of Island

/**
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

 

Example 1:


Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
 */
// Time Complexity: O(m*n) where m*n is the size of the grid
// Space Complexity: O(m*n) where m*n is the size of the grid
function maxAreaOfIsland(grid) {
  const row = grid.length;
  const col = grid[0].length;
  let maxArea = -Infinity;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      maxArea = Math.max(maxArea, dfs(r, c, row, col, grid));
    }
  }
  return maxArea
}

function dfs(r, c, row, col, grid) {
  // BaseCase
  // if not inbound, or value is not land, return 0
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  if (!rowInBound || !colInBound || !grid[r][c]) return 0;

  // Flip grid value
  grid[r][c] = 0;

  // Traverse left, right, up, down and add up the length
  return (
    1 +
    dfs(r + 1, c, row, col, grid) +
    dfs(r - 1, c, row, col, grid) +
    dfs(r, c + 1, row, col, grid) +
    dfs(r, c - 1, row, col, grid)
  );
}
// grid = [
//   [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
//   [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
// ];
// console.log(maxAreaOfIsland(grid));
