// Spiral Matrix II

/**
 * Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

 

Example 1:


Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 20
 */

function generateMatrix(n) {
  const matrix = new Array(n).fill(0).map((e) => new Array(n));
  const max = n * n;
  let val = 1;
  let minR = 0, maxR = n - 1;
  let minC = 0, maxC = n - 1;
  while (val <= max) {
    // Go right
    for (let c = minC; c <= maxC; c++) {
      matrix[minR][c] = val++;
    }
    minR++;
    // Go down
    for (let r = minR; r <= maxR; r++) {
      matrix[r][maxC] = val++;
    }
    maxC--;
    // Go left
    for (let c = maxC; c >= minC; c--) {
      matrix[maxR][c] = val++;
    }
    maxR--;
    // Go up
    for (let r = maxR; r >= minR; r--) {
      matrix[r][minC] = val++;
    }
    minC++;
  }
  return matrix;
}


generateMatrix(4);
