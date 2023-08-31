// 542. 01 Matrix

/**
 * Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

 

Example 1:


Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
Example 2:


Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
 */
// Will need to add path and backtracking
// Time Complexity: O(n*m)
// Space Complexity: O(1) since the dp is for returned matrix
function updateMatrix(mat: number[][]): number[][] {
  // Intiailize the result array if all value to be Infinity
  // This result array will be updated as we traverse the grid
  const row = mat.length;
  const col = mat[0].length;
  const dp = new Array(row).fill(0).map((e) => new Array(col).fill(Infinity));

  // Loop left -> right, up -> down
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // If value 0, replace with 0
      if (mat[r][c] === 0) dp[r][c] = 0;
      else {
        // Cur = 1 + Min (up, left)
        const up = r > 0 ? dp[r - 1][c] : Infinity;
        const left = c > 0 ? dp[r][c - 1] : Infinity;
        dp[r][c] = Math.min(up, left) + 1;
      }
    }
  }

  // Loop down -> up, right -> left
  for (let r = row - 1; r >= 0; r--) {
    for (let c = col - 1; c >= 0; c--) {
      // Cur = 1 + Min (down,right) || cur value
      const down = r < row - 1 ? dp[r + 1][c] : Infinity;
      const right = c < col - 1 ? dp[r][c + 1] : Infinity;
      dp[r][c] = Math.min(dp[r][c], Math.min(down, right) + 1);
    }
  }
  return dp;
}

// Use BFS
function updateMatrix(mat: number[][]): number[][] {
  const row = mat.length;
  const col = mat[0].length;
  let queue: number[][] = [];
  const result = new Array(row)
    .fill(0)
    .map((e) => new Array(col).fill(Infinity));
  // Get all position with 0
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (mat[r][c] === 0) {
        result[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  // While the queue is not empty, mean still have grid to fill
  let path = 1;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length) {
    const nextQueue: number[][] = [];
    for (const [r, c] of queue) {
      for (const [x, y] of dirs) {
        const newR = r + x;
        const newC = c + y;
        const rowInBound = newR >= 0 && newR < row;
        const colInBound = newC >= 0 && newC < col;
        // If the grid has not been updated
        if (rowInBound && colInBound && result[newR][newC] === Infinity) {
          result[newR][newC] = path;
          nextQueue.push([newR, c + y]);
        }
      }
    }
    // update queue and path length
    path++;
    queue = nextQueue;
  }
  return result;
}
const mat = [
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 1],
];
console.table(updateMatrix(mat));
