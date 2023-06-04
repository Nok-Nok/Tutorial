// Kth Largest Element in a Stream

/**
 * You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

 

Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] is either 0 or 1.
 */

function largestIsland(grid) {
  // Obtain row and col
  const row = grid.length;
  const col = grid[0].length;
  const visited = new Set();
  let maxArea = 0;
  let count = 0;
  // Traverse through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === 1 && !visited.has(r + ',' + c)) {
        // Intialize a visiting set for current island
        const curIsland = new Set();
        // DFS that island
        dfs(r, c, row, col, grid, visited, curIsland);
        count++;
        const islandArea = curIsland.size;
        maxArea = Math.max(maxArea, islandArea);
        // Update the grid with its ID & its area
        for (const pos of curIsland) {
          const [r, c] = pos.split(',');
          grid[r][c] = [count, islandArea];
        }
      }
    }
  }
  // console.table(grid);
  // Traverse through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // If grid is a 0, get maxArea of neighbor island
      if (!grid[r][c]) {
        const visitedGroup = new Set();
        const newArea =
          1 +
          getIslandArea(r + 1, c, row, col, grid, visitedGroup) +
          getIslandArea(r - 1, c, row, col, grid, visitedGroup) +
          getIslandArea(r, c + 1, row, col, grid, visitedGroup) +
          getIslandArea(r, c - 1, row, col, grid, visitedGroup);

        maxArea = Math.max(maxArea, newArea);
      }
    }
  }
  return maxArea;
}

function dfs(r, c, row, col, grid, visited, curIsland) {
  // Base case: if out of bound or has visited or grid val is 0, return
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  const pos = r + ',' + c;
  if (!rowInBound || !colInBound || visited.has(pos) || grid[r][c] === 0)
    return;

  // Recursive case:
  // Update visited & currentIsland set:
  visited.add(pos);
  curIsland.add(pos);
  // traverse left, right, top, down
  dfs(r + 1, c, row, col, grid, visited, curIsland);
  dfs(r - 1, c, row, col, grid, visited, curIsland);
  dfs(r, c + 1, row, col, grid, visited, curIsland);
  dfs(r, c - 1, row, col, grid, visited, curIsland);
}

function getIslandArea(r, c, row, col, grid, visitedGroup) {
  // Base case: if out of bound or grid val is 0, return 0
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  if (!rowInBound || !colInBound || grid[r][c] === 0) return 0;

  const [id, area] = grid[r][c];
  // If this group has been visited, return 0
  if (visitedGroup.has(id)) return 0;

  // Update visitedGroup and return area
  visitedGroup.add(id);
  return area;
}

// Time Exceeded

function largestIsland1(grid) {
  // Obtain row and col
  const row = grid.length;
  const col = grid[0].length;
  const islandGroup = [];
  const visited = new Set();
  let maxArea = 0;
  // Traverse through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === 1 && !visited.has(r + ',' + c)) {
        // Intialize a visiting set for current island
        const curIsland = new Set();
        // DFS that island
        dfs1(r, c, row, col, grid, visited, curIsland);
        islandGroup.push(curIsland);
        maxArea = Math.max(maxArea, curIsland.size);
      }
    }
  }
  // console.table(grid);
  // console.log(islandGroup);
  // Traverse through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // If grid is a 0, get maxArea of neighbor island
      if (!grid[r][c]) {
        const up = r - 1 + ',' + c;
        const down = r + 1 + ',' + c;
        const left = r + ',' + (c - 1);
        const right = r + ',' + (c + 1);
        const pos = [up, down, left, right];
        // Loop through the area group
        let newArea = 1;
        for (const island of islandGroup) {
          if (pos.some((p) => island.has(p))) newArea += island.size;
        }
        maxArea = Math.max(maxArea, newArea);
      }
    }
  }
  return maxArea;
}
function dfs1(r, c, row, col, grid, visited, curIsland) {
  // Base case: if out of bound or has visited or grid val is not 1, return
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  const pos = r + ',' + c;
  if (!rowInBound || !colInBound || visited.has(pos) || grid[r][c] !== 1)
    return;

  // Recursive case:
  // Update visited & currentIsland set:
  visited.add(pos);
  curIsland.add(pos);
  // traverse left, right, top, down
  dfs1(r + 1, c, row, col, grid, visited, curIsland);
  dfs1(r - 1, c, row, col, grid, visited, curIsland);
  dfs1(r, c + 1, row, col, grid, visited, curIsland);
  dfs1(r, c - 1, row, col, grid, visited, curIsland);
}

grid = [
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1],
  [0, 0, 1, 0, 1],
];
console.log(largestIsland(grid));
