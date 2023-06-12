// Longest Increasing Path in a Matrix

/**
 * Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 

Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 231 - 1
 */

// Perform Top-Down DP using memoization
// Space complexity: O(n*m) where n*m is the size of the matrix to track the max Path length from each position
// Time complexity: O(n*m) where n*m is the size of the matrix since we will visit each grid once. 
function longestIncreasingPath(matrix) {
  // Obtain the size of the matrix
  const row = matrix.length;
  const col = matrix[0].length;
  // Intialize a max length
  let max = 1;
  // Initialize memoization visited
  const visited = new Array(row).fill(0).map((e) => new Array(col).fill(0));
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      dfs(r, c, row, col, matrix, -Infinity);
    }
  }
  console.table(visited);
  return max;
  function dfs(r, c, row, col, matrix, preVal) {
    // Base case:
    // If out out bound or curVal<=prevVal (we need to go in increasing path => next Val must > prev Val), return 0
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || matrix[r][c] <= preVal) return 0;
    // If has been visited, return visited value:
    if (visited[r][c]) return visited[r][c];

    // Recursive case:
    // Update visited & preVal
    visited[r][c] = 1;
    preVal = matrix[r][c];

    // Traverse left, right, up, down:
    const left = dfs(r, c - 1, row, col, matrix, preVal);
    const right = dfs(r, c + 1, row, col, matrix, preVal);
    const up = dfs(r - 1, c, row, col, matrix, preVal);
    const down = dfs(r + 1, c, row, col, matrix, preVal);

    // Update visited since maxLength we can travel is if we can traverse to an max possible length in left, right, up, down
    visited[r][c] += Math.max(left, right, up, down);

    // Update max length
    max = Math.max(max, visited[r][c]);
    return visited[r][c];
  }
}
matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1],
];
console.log(longestIncreasingPath(matrix));
matrix = [
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1],
];
console.log(longestIncreasingPath(matrix));
