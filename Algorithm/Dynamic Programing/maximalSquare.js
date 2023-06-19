// Maximal Square

/**
 * Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

 

Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
Example 2:


Input: matrix = [["0","1"],["1","0"]]
Output: 1
Example 3:

Input: matrix = [["0"]]
Output: 0
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is '0' or '1'.
 */

// Try 1D DP top down approach
/**
 * @param {character[][]} matrix
 * @return {number}
 */
// Time Complexity: O(m*n) where m*n is size of matrix
// Space Complexity: O(2 * n) where n is number of columns of matrix
var maximalSquare = function (matrix) {
  const row = matrix.length;
  const col = matrix[0].length;
  // Intiailize dp
  let dp = new Array(col).fill(0);
  // Cannot go pass 0 position
  dp[-1] = 0;
  let maxSize = 0;

  for (let r = 0; r < row; r++) {
    // Intiailize dp
    const newDp = new Array(col).fill(0);
    // Cannot go pass 0 position
    newDp[-1] = 0;
    for (let c = 0; c < col; c++) {
      // If position is 0, can't make a square => 0
      if (matrix[r][c] === '0') newDp[c] = 0;
      // Else, size of the square  = min (left, prevLeft, prevUp) + 1
      else {
        newDp[c] = Math.min(newDp[c - 1], dp[c - 1], dp[c]) + 1;
        maxSize = Math.max(maxSize, newDp[c]);
      }
    }
    // Reassign dp
    dp = newDp;
  }
  return maxSize * maxSize;
};

matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
];
console.log(maximalSquare(matrix));
matrix = [
  ['0', '1'],
  ['1', '0'],
];
console.log(maximalSquare(matrix));
matrix = [['0']];
console.log(maximalSquare(matrix));
