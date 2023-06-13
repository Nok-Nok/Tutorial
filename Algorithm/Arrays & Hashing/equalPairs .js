// Equal Row and Column Pairs

const { check } = require('prettier');

/**
 * Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

 

Example 1:


Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]
Example 2:


Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]
 

Constraints:

n == grid.length == grid[i].length
1 <= n <= 200
1 <= grid[i][j] <= 105
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
// Naive approach
// Store row in cache
// If col in cach add 1
// Time complexity: O(N2)
// Space complexity: O(N2)
var equalPairs = function (grid) {
  const cache = {};
  const row = grid.length;
  const col = grid[0].length;
  const tranposeGrid = new Array(col).fill(0).map((e) => new Array(row));
  // console.table(grid);
  for (let r = 0; r < row; r++) {
    cache[grid[r]] = (cache[grid[r]] || 0) + 1;
    for (let c = 0; c < col; c++) {
      tranposeGrid[r][c] = grid[c][r];
    }
  }
  // console.log(cache);
  // console.table(tranposegrid);
  let count = 0;
  tranposeGrid.forEach((row) =>
    cache[row] ? (count += cache[row]) : undefined
  );
  return count;
};

// Time complexity: O(N2)
// Space complexity: O(N2)
var equalPairs = function (grid) {
  const row = grid.length;
  const col = grid[0].length;
  const cache = {};
  // Construct the cache of rows value
  for (let r = 0; r < row; r++) {
    cache[grid[r]] = (cache[grid[r]] || 0) + 1;
  }
  let count = 0;
  // Check if cols value exist in the cache
  for (let c = 0; c < col; c++) {
    const rowArr = [];
    for (let r = 0; r < row; r++) {
      rowArr.push(grid[r][c]);
    }
    count += cache[rowArr] ?? 0;
  }
  return count;
};

grid = [
  [3, 2, 1],
  [1, 7, 6],
  [2, 7, 7],
];
console.log(equalPairs(grid));
grid = [
  [3, 1, 2, 2],
  [1, 4, 4, 5],
  [2, 4, 2, 2],
  [2, 4, 2, 2],
];
console.log(equalPairs(grid));
