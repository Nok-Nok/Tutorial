// Number of Increasing Paths in a Grid

/**
 * You are given an m x n integer matrix grid, where you can move from a cell to any adjacent cell in all 4 directions.

Return the number of strictly increasing paths in the grid such that you can start from any cell and end at any cell. Since the answer may be very large, return it modulo 109 + 7.

Two paths are considered different if they do not have exactly the same sequence of visited cells.

 

Example 1:


Input: grid = [[1,1],[3,4]]
Output: 8
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [1], [3], [4].
- Paths with length 2: [1 -> 3], [1 -> 4], [3 -> 4].
- Paths with length 3: [1 -> 3 -> 4].
The total number of paths is 4 + 3 + 1 = 8.
Example 2:

Input: grid = [[1],[2]]
Output: 3
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [2].
- Paths with length 2: [1 -> 2].
The total number of paths is 2 + 1 = 3.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 1000
1 <= m * n <= 105
1 <= grid[i][j] <= 105
 */

// May use dfs to get the lenght of the paths
// Giving time exceeded since some work is being repeated, think about dp or memoization
var countPaths = function (grid) {
  // Get the size of the grid
  const row = grid.length;
  const col = grid[0].length;
  const mod = 10 ** 9 + 7;
  // Loop through the grid
  // At each position: dfs to get the length
  let total = 0;
  const visited = new Set();
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      total += dfs(r, c, row, col, visited, -Infinity);
    }
  }
  return total % mod;
  function dfs(r, c, row, col, visited, preVal) {
    // Base case:
    // if out of bound or already visited or cur < prev: return 0
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const key = r + ',' + c;
    if (!rowInBound || !colInBound || visited.has(key) || grid[r][c] <= preVal)
      return 0;
    // Recursive case:
    // Update visited set
    visited.add(key);
    // Traverse left, right, top, down
    preVal = grid[r][c];
    const left = dfs(r, c - 1, row, col, visited, preVal);
    const right = dfs(r, c + 1, row, col, visited, preVal);
    const up = dfs(r - 1, c, row, col, visited, preVal);
    const down = dfs(r + 1, c, row, col, visited, preVal);

    // Back Tracking, remove position from the visited
    visited.delete(key);
    // Return the sum of possible path lengths
    return 1 + left + right + up + down;
  }
};

// Time Complexity: O(m*n) where m*n is the size of the grid
// Space Complexity: O(m*n) where m*n is the size of the grid
var countPaths = function (grid) {
  // Get the size of the grid
  const row = grid.length;
  const col = grid[0].length;
  const mod = Math.pow(10, 9) + 7;
  const visited = new Array(row).fill(0).map((e) => new Array(col).fill(0));
  let total = 0;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      total += dfs(r, c, row, col, visited, -Infinity) % mod;
    }
  }
  return total % mod;

  function dfs(r, c, row, col, visited, preVal) {
    // Base case: out of bound  or cur<=preVal, return []
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || grid[r][c] <= preVal) return 0;
    // Base case: visited, return cached value
    if (visited[r][c]) return visited[r][c];

    // Recursive case:
    // Update visited (1 since a single value is a stand-alone increasing path)
    visited[r][c] = 1;
    // Traverse left, right, top, down
    preVal = grid[r][c];
    const left = dfs(r, c - 1, row, col, visited, preVal) % mod;
    const right = dfs(r, c + 1, row, col, visited, preVal) % mod;
    const up = dfs(r - 1, c, row, col, visited, preVal) % mod;
    const down = dfs(r + 1, c, row, col, visited, preVal) % mod;
    // Add # paths we can do from left, right, up, down
    visited[r][c] += (left + right + up + down) % mod;
    return visited[r][c];
  }
};

grid = [
  [1, 1],
  [3, 4],
];
console.log(countPaths(grid));
grid = [[1], [2]];
console.log(countPaths(grid));
