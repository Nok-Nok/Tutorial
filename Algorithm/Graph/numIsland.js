/*

Given a 2d grid map of 1s (land) and 0s (water), count the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are all
surrounded by water.

EXAMPLE 1:

Input:
[
  [0, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0]
]
Output: 1

Input:
[
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1]
]
Output: 3

Assume that the grid will be an array of arrays of numbers either 0 or 1, and
that the grid will have at least one element.

*/

const numIslands = (grid) => {
  // Intialize a visited set
  const visited = new Set();
  // Initialize a counter for number of islands
  let count = 0;
  // Obtain number of row and cols of the grid
  const row = grid.length;
  const col = grid[0].length;
  // Traverse through rows
  for (let r = 0; r < row; r++) {
    // Traverse through cols
    for (let c = 0; c < col; c++) {
      // If grid is 1 & we have not visited this position, we have met the new island
      if (grid[r][c] && !visited.has(r + ',' + c)) {
        // Put all land of this island into the visit set
        visitIsland(r, c, grid, row, col, visited);
        // Update count
        count++;
      }
    }
  }
  return count;
};

// Helper function to put all lands of an island into visit set
function visitIsland(r, c, grid, row, col, visited) {
  // Base Case: if position is not inbound or if we have visited this position or if there is no land
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  const pos = r + ',' + c;
  if (!rowInBound || !colInBound || visited.has(pos) || !grid[r][c]) return;

  // Recursive:
  // Add this position to the visited set
  visited.add(pos);
  // DFS: left, right, top, bottom
  visitIsland(r, c - 1, grid, row, col, visited);
  visitIsland(r, c + 1, grid, row, col, visited);
  visitIsland(r - 1, c, grid, row, col, visited);
  visitIsland(r + 1, c, grid, row, col, visited);
}

// console.log(
//   numIslands([
//     [0, 1, 1, 1, 0],
//     [1, 1, 0, 1, 0],
//     [1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//   ])
// );
