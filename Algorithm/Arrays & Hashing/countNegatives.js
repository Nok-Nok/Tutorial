// Count Negative Numbers in a Sorted Matrix

/**
 * Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.

 

Example 1:

Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.
Example 2:

Input: grid = [[3,2],[1,0]]
Output: 0
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 100
-100 <= grid[i][j] <= 100
 

Follow up: Could you find an O(n + m) solution?
 */
function countNegatives(grid) {
  const row = grid.length;
  const col = grid[0].length;
  let i = 0;
  let j = col;
  let count = 0;
  while (i < row) {
    // Move to min val of
    while (grid[i][j - 1] < 0) j--;
    count += col - j;
    // Move to next row
    i++;
  }
  return count;
}
grid = [
  [4, 3, 2, -1],
  [3, 2, 1, -1],
  [1, 1, -1, -2],
  [-1, -1, -2, -3],
];
console.log(countNegatives(grid));
