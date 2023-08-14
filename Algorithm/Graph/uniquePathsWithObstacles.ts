// 63. Unique Paths II

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
// Time Complexity: O(r*c)
// Space Complexity: O(c)
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const row: number = obstacleGrid.length;
  const col: number = obstacleGrid[0].length;
  const MOD: number = 2 * 10 ** 9;
  // Edge case: if obstacle at bottom right is obstacles, return 0
  if (obstacleGrid[row - 1][col - 1]) return 0;
  // Initialze the dp array
  const dp: number[] = new Array(col + 1).fill(0);
  // If start at the bottom right, we will always have 1 option
  dp[col - 1] = 1;

  for (let i = row - 1; i >= 0; i--) {
    for (let j = col - 1; j >= 0; j--) {
      // if obstacles, auto 0
      if (obstacleGrid[i][j]) dp[j] = 0;
      else {
        dp[j] = (dp[j] + dp[j + 1]) % MOD;
      }
    }
  }
  return dp[0];
}
const obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
console.log(uniquePathsWithObstacles(obstacleGrid));
