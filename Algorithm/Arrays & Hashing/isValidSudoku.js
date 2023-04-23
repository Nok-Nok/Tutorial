// Valid Sudoku
/**
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 
 */

function isValidSudoku(board) {
  // Initialize colSet to check for column conditions
  const colSet = new Array(9).fill(0).map((e) => new Set());
  // Initialize boxSet to check for box conditions
  const boxSet = new Array(9).fill(0).map((e) => new Set());
  for (let r = 0; r < board.length; r++) {
    // Initialize rowSet to check for row conditions
    const rowSet = new Set();
    for (let c = 0; c < board[0].length; c++) {
      const val = board[r][c];
      const boxPos = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      // Skip if value is '.'
      if (val === '.') continue;
      // Check row, col and box condition
      if (rowSet.has(val) || colSet[c].has(val) || boxSet[boxPos].has(val))
        return false;
      // Update row, col and box sets
      rowSet.add(val);
      colSet[c].add(val);
      boxSet[boxPos].add(val);
    }
  }
  return true;
}
