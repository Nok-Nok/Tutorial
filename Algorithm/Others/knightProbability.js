// 688. Knight Probability in Chessboard

/**
 * On an n x n chessboard, a knight starts at the cell (row, column) and attempts to make exactly k moves. The rows and columns are 0-indexed, so the top-left cell is (0, 0), and the bottom-right cell is (n - 1, n - 1).

A chess knight has eight possible moves it can make, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.


Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.

The knight continues moving until it has made exactly k moves or has moved off the chessboard.

Return the probability that the knight remains on the board after it has stopped moving.

 

Example 1:

Input: n = 3, k = 2, row = 0, column = 0
Output: 0.06250
Explanation: There are two moves (to (1,2), (2,1)) that will keep the knight on the board.
From each of those positions, there are also two moves that will keep the knight on the board.
The total probability the knight stays on the board is 0.0625.
Example 2:

Input: n = 1, k = 0, row = 0, column = 0
Output: 1.00000
 

Constraints:

1 <= n <= 25
0 <= k <= 100
0 <= row, column <= n - 1
 */

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
// This is a DP problem
// Let's try to dfs memoization first
// Time Complexity: O(n^2 * k)
// Space Complexity: O(n^2 * k) for caching +  O(n^2 * k) for recursion
var knightProbability = function (n, k, row, column) {
  const cache = {};
  return dfs(row, column, k);
  function dfs(row, col, k) {
    // Base case: if out of bound, return 0
    const rowInBound = row >= 0 && row < n;
    const colInBound = col >= 0 && col < n;
    if (!rowInBound || !colInBound) return 0;
    // Base case: if position has been visited before
    const pos = row + ',' + col + ',' + k;
    if (pos in cache) {
      return cache[pos];
    }
    // Base case: if k=0, return 1
    if (k === 0) return 1;
    // Recursive case:
    // Traverse through all possible positions
    const dirs = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];
    // Sum up the probabilities from all postion
    let prop = 0;
    for (const [x, y] of dirs) {
      prop += dfs(row + x, col + y, k - 1);
    }
    // Return with tot divide by 8 since we have 8 possible possibilities
    return (cache[pos] = prop / 8);
  }
};

// Optmize a bit for less recursion
var knightProbability = function (n, k, row, column) {
  const cache = {};
  const dirs = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  return dfs(row, column, k);
  function dfs(row, col, k) {
    // Base case: if position has been visited before
    const pos = row + ',' + col + ',' + k;
    if (pos in cache) {
      return cache[pos];
    }
    // Base case: if k=0, return 1
    if (k === 0) return 1;
    // Recursive case:
    // Traverse through all possible positions
    // Sum up the probabilities from all postion
    let prop = 0;
    for (const [x, y] of dirs) {
      const newR = row + x;
      const newC = col + y;
      // Base case: if out of bound, return 0
      const rowInBound = newR >= 0 && newR < n;
      const colInBound = newC >= 0 && newC < n;
      if (rowInBound && colInBound) prop += dfs(newR, newC, k - 1);
    }
    // Return with tot divide by 8 since we have 8 possible possibilities
    return (cache[pos] = prop / 8);
  }
};

// Try with bottom up DP
// Time complexity: O(k*n^2)
// Space complexity: O(k*n^2) (no more space needed for recursion)
var knightProbability = function (n, k, row, column) {
  // Intialize the maxtrix for DP
  const dp = new Array(k + 1)
    .fill(0)
    .map((e) => new Array(n).fill(0).map((e) => new Array(n).fill(0)));
  //Initial position when has not make any move would have 100% possiblity since we get a guarantee that the given row and column would be withing range
  dp[0][row][column] = 1;
  const dirs = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  //  DP
  // dp[i][j] = 1/8 sum of possibilities of the next 8 pos
  for (let move = 1; move <= k; move++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (const [x, y] of dirs) {
          const r = i + x;
          const c = j + y;
          const rowInBound = r >= 0 && r < n;
          const colInBound = c >= 0 && c < n;
          if (rowInBound && colInBound) dp[move][i][j] += dp[move - 1][r][c];
        }
        dp[move][i][j] /= 8;
      }
    }
  }
  // Sum up the total possibility for k moves
  let tot = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      tot += dp[k][i][j];
    }
  }
  return tot;
};

// Optimize Space
var knightProbability = function (n, k, row, column) {
  // Intialize the maxtrix for DP
  let prev = new Array(n).fill(0).map((e) => new Array(n).fill(0));
  let cur = new Array(n).fill(0).map((e) => new Array(n).fill(0));
  //Initial position when has not make any move would have 100% possiblity since we get a guarantee that the given row and column would be withing range
  prev[row][column] = 1;
  const dirs = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  //  DP
  for (let move = 1; move <= k; move++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        cur[i][j] = 0;
        // cur[i][j] = 1/8 sum of possibilities of the prev 8 pos
        for (const [x, y] of dirs) {
          const r = i + x;
          const c = j + y;
          const rowInBound = r >= 0 && r < n;
          const colInBound = c >= 0 && c < n;
          if (rowInBound && colInBound) cur[i][j] += prev[r][c] / 8;
        }
      }
    }
    // Replace dp for next move
    // Reason why we switch so that when we reset cur array, prev array will not be affect since they are referencing at 2 different points
    [prev, cur] = [cur, prev];
  }
  // Sum up the total possibility for k moves
  let tot = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      tot += prev[i][j];
    }
  }
  return tot;
};

(n = 3), (k = 2), (row = 0), (column = 0);
console.log(knightProbability(n, k, row, column));
(n = 1), (k = 0), (row = 0), (column = 0);
console.log(knightProbability(n, k, row, column));
(n = 8), (k = 30), (row = 6), (column = 4);
console.log(knightProbability(n, k, row, column));
