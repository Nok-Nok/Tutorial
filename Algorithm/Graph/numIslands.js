// Number of Islands
/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
 */
// Time Complexity: O(n*m) where n*m is the size of the grid
// Space Complexity: O(n*m) where n*m is the size of the grid
function numIslands(grid) {
  // Obtain number of row and col
  const row = grid.length;
  const col = grid[0].length;
  let count = 0;
  // Loop through the grid to find the island
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === '1') {
        dfs(r, c, row, col, grid);
        count++;
      }
    }
  }
  return count;
}

function dfs(r, c, row, col, grid) {
  // Base case: if not inbound, or not a land, end
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  const pos = r + ',' + c;
  if (!rowInBound || !colInBound || grid[r][c] === '0') return;

  // Flip value of grid
  grid[r][c] = '0';
  // Traverse left, right, up, dow
  dfs(r + 1, c, row, col, grid);
  dfs(r - 1, c, row, col, grid);
  dfs(r, c + 1, row, col, grid);
  dfs(r, c - 1, row, col, grid);
}
