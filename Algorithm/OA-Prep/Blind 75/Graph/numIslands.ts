// 200. Number of Islands

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
// Time Complexity: O(n*m) since we will visit each grid max 1 time
// Space Complexity: O(n*m) for the recursion
function numIslands(grid: string[][]): number {
  const row = grid.length;
  const col = grid[0].length;
  let count = 0;
  // Loop through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // If found 1, expand the search for the whole island
      if (grid[r][c] === '1') {
        dfs(r, c);
        // Upate count
        count++;
      }
    }
  }
  return count;
  // DFS to search for the whole island
  function dfs(r: number, c: number) {
    // base case: out of bound or value is not 1
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || grid[r][c] !== '1') return;

    // Recursive case:
    // Update grid value to -1
    grid[r][c] = '-1';
    // Traverse left rigth up down
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
}
// Let's try BFS?
function numIslands(grid: string[][]): number {
  const row = grid.length;
  const col = grid[0].length;
  let count = 0;
  // Loop through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // If found 1, expand the search for the whole island
      if (grid[r][c] === '1') {
        bfs(r, c);
        // Upate count
        count++;
      }
    }
  }
  return count;

  function bfs(r: number, c: number) {
    let queue = [[r, c]];
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    while (queue.length) {
      const nextQueue: number[][] = [];
      const len = queue.length;
      // Loop through the queue
      for (const [r, c] of queue) {
        // Base case:
        // The base case for '1' must be out here since we may update the grid value after updating the nextqueue, which will get us TLE
        const rowInBound = r >= 0 && r < row;
        const colInBound = c >= 0 && c < col;
        if (!rowInBound || !colInBound || grid[r][c] !== '1') continue;

        // Recursive case:
        // Update grid value to -1
        grid[r][c] = '-1';
        // Update the newQueue
        for (const [x, y] of dirs) {
          nextQueue.push([r + x, c + y]);
        }
      }
      // Update queue
      queue = nextQueue;
    }
  }
}
const grid = [
  ['1', '1', '1'],
  ['0', '1', '0'],
  ['1', '1', '1'],
];
console.log(numIslands(grid));
