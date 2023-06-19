// Minimum Falling Path Sum

/**
 * Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

 

Example 1:


Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: There are two falling paths with a minimum sum as shown.
Example 2:


Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The falling path with a minimum sum is shown.
 

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100
 */

// Use 2 array for 1D DP approach Bottom Up
// Will see if we can optimize to only 1 array

/**
 * @param {number[][]} matrix
 * @return {number}
 */
// Time Complexity: O(m*n) where m*n is size of matrix
// Space Complexity: O(2*m) where m is number of columns
var minFallingPathSum = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  // Intiialize dp
  let dp = new Array(col + 1).fill(0);
  // We can travel exceed the size of grid
  dp[col] = Infinity;
  dp[-1] = Infinity;

  // Traverse from [row-1][col-1] to [0][[0]
  for (let r = row - 1; r >= 0; r--) {
    const newDp = new Array(col + 1).fill(0);
    // We can travel exceed the size of grid
    newDp[col] = Infinity;
    newDp[-1] = Infinity;
    for (let c = col - 1; c >= 0; c--) {
      // F(n) = cur + Min of prev(left, cur pos, right)
      newDp[c] = matrix[r][c] + Math.min(dp[c - 1], dp[c], dp[c + 1]);
    }
    // Reassign to newDp
    dp = newDp;
  }
  return Math.min(...dp);
};

// matrix = [
//   [2, 1, 3],
//   [6, 5, 4],
//   [7, 8, 9],
// ];
// console.log(minFallingPathSum(matrix));
// matrix = [
//   [-19, 57],
//   [-40, -5],
// ];
// console.log(minFallingPathSum(matrix));
