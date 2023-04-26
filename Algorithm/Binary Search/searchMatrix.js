// Search a 2D Matrix
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

// Space Complexity: O(1);
// Time Complexity O(log m*n) where m is number of rows and n is number of columns
function searchMatrix1(matrix, target) {
  // Intialize left and right pointer
  const row = matrix.length;
  const col = matrix[0].length;
  let left = 0;
  let right = row * col - 1;
  // While left<=right
  while (left <= right) {
    // Find midpoint
    const mid = Math.floor((left + right) / 2);
    // Find the value at midpoint
    const midVal = matrix[Math.floor(mid / col)][mid % col];
    // If value == target, return true
    if (midVal === target) return true;
    // else if value>target, move right pointer
    else if (midVal > target) right = mid - 1;
    // else move left pointer
    else left = mid + 1;
  }
  return false;
}

// Space Complexity: O(1);
// Time Complexity: O(log m + log n) where m is number of rows and n is number of columns
function searchMatrix(matrix, target) {
  const row = matrix.length;
  const col = matrix[0].length;

  // Intialize start and end pointer
  let start = 0;
  let end = row - 1;
  let r;

  // Find the row that contains target
  while (start <= end) {
    // Find mid row
    r = Math.floor((start + end) / 2);
    // Move up if value < cur row 1st val
    if (target < matrix[r][0]) end = r - 1;
    // Move down if value >cur row last val
    else if (target > matrix[r][col - 1]) start = r + 1;
    // If target is between 1st value before and after => break loop
    else break;
  }

  // Find if value in the row
  start = 0;
  end = col - 1;
  // While start<=end
  while (start <= end) {
    // Find mid column
    const c = Math.floor((start + end) / 2);
    // If mid value == target, return true
    if (matrix[r][c] === target) return true;
    // else if value>target, move end pointer
    else if (matrix[r][c] > target) end = c - 1;
    // else move start pointer
    else start = c + 1;
  }
  return false;
}

(matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
]),
  (target = 16);
console.log(searchMatrix(matrix, target));
