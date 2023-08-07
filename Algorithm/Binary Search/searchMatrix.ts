// 74. Search a 2D Matrix

/**
 * You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
 */

// This is a BS question
// Time Complexity: O(log (n*m))
// Space Complexity: O(1)
function searchMatrix1(matrix: number[][], target: number): boolean {
  const col: number = matrix[0].length;
  // BS for row to contain the number
  let l: number = 0,
    r: number = matrix.length - 1;
  let row: number | undefined;
  while (l <= r) {
    row = Math.floor((l + r) / 2);
    if (matrix[row][0] <= target && target <= matrix[row][col - 1]) break;
    else if (matrix[row][0] > target) r = row - 1;
    else l = row + 1;
  }
  if (row === undefined) return false;
  // BS for the number
  (l = 0), (r = col - 1);
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (matrix[row][m] === target) return true;
    else if (matrix[row][m] < target) l = m + 1;
    else r = m - 1;
  }
  return false;
}

// This is a BS question
// Time Complexity: O(log (n*m))
// Space Complexity: O(1)
function searchMatrix(matrix: number[][], target: number): boolean {
  // Obtain row & col
  const row: number = matrix.length;
  const col: number = matrix[0].length;
  // Intialize left and right pointers
  let left: number = 0;
  let right: number = row * col - 1;
  while (left <= right) {
    // Get the mid pointer
    const m: number = Math.floor((left + right) / 2);
    // Convert mid pointer to position r & c
    const r: number = Math.floor(m / col);
    const c: number = m % col;
    // If found target return true
    if (matrix[r][c] === target) return true;
    // If < target, move left pointer up
    else if (matrix[r][c] < target) left = m + 1;
    // Else move right pointer down
    else right = m - 1;
  }
  return false;
}
const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target = 17;
console.log(searchMatrix(matrix, target));
