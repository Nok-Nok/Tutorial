// Unique Paths II

/**
 * You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */

// 1D DP approach
// Time Complexity: O(m*n) where m*n is the size of the grid
// Space Complexity: O(n) where n is number of columns
var uniquePathsWithObstacles = function (obstacleGrid) {
  // Obtain the size of the grid
  const row = obstacleGrid.length;
  const col = obstacleGrid[0].length;

  // Intialize a dp (Orignally, we will have 0 combination)
  const dp = new Array(col + 1).fill(0);
  // Initialize ending: if we start at the end position, we have 1 unique path
  dp[col - 1] = 1;

  // Traverse through the grid from [row-1][col-1] to [0][0]
  for (let r = row - 1; r >= 0; r--) {
    for (let c = col - 1; c >= 0; c--) {
      // If meet obstacle, we can't pass that => 0
      if (obstacleGrid[r][c]) dp[c] = 0;
      // Else: it would be sum of going right and down
      // F(n) = F(right+down)
      else dp[c] = dp[c] + dp[c + 1];
    }
  }
  // Return the total unique paths if we start from position [0][0]
  return dp[0];
};
obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
console.log(uniquePathsWithObstacles(obstacleGrid));
obstacleGrid = [
  [0, 1],
  [0, 0],
];
console.log(uniquePathsWithObstacles(obstacleGrid));
