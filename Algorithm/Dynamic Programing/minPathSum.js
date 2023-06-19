// Minimum Path Sum

/**
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

 

Example 1:


Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 200
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */

// Do 1-D DP bottom up approach
// Time Complexity: O(m*n) where m*n is the size of the grid
// Space complexity: O(n) where n is the number of columns of the grid
var minPathSum = function (grid) {
  // Obtain the size of the grid
  const row = grid.length;
  const col = grid[0].length;

  // Create a dp array
  const dp = new Array(col + 1).fill(Infinity);
  // Intialize the starting position: If we start at the ending position, we don't need to travel any more
  dp[col - 1] = 0;

  // Traverse the grid from position [row-1][col-1] to [0,0] to calculate the minPathCost
  for (let r = row - 1; r >= 0; r--) {
    for (let c = col - 1; c >= 0; c--) {
      // To travel to a postion: it would be the cost of that position + travel right/down
      // F(n) = cur + Math.min (right, down)
      dp[c] = grid[r][c] + Math.min(dp[c + 1], dp[c]);
    }
    // console.table([dp]);
  }
  // Return the cost if the start position is [0][0]
  return dp[0];
};

grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
console.log(minPathSum(grid));
grid = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(minPathSum(grid));
