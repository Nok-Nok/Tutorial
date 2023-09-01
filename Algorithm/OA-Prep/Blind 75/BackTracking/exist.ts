// 79. Word Search

/**
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 
 */
// Graph & Back Tracking question
// Time Complexity: O(n * 4^L) where n is the size of the board and L is the length of the word
// Space Complexity: O(L) where L is the length of the word for caching the visited set + O(L) for the recursion stack
function exist(board: string[][], word: string): boolean {
  const row = board.length;
  const col = board[0].length;
  const visited: Set<string> = new Set();
  // Loop through the grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // Perform a DFS
      // if foudn, return true, else continue
      if (dfs(0, r, c)) return true;
    }
  }
  return false;

  function dfs(i: number, r: number, c: number) {
    // Base Case:
    // If reach end of the word return true
    if (i === word.length) return true;
    // If out of bound || has be visited || not match with the curent letter return false
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const pos = r + ',' + c;
    if (
      !rowInBound ||
      !colInBound ||
      visited.has(pos) ||
      board[r][c] !== word[i]
    )
      return false;

    // Recursive Case:
    // We know that current char is matching
    // Update the visited set
    visited.add(pos);
    i++;
    // Traverse left, right, up, down
    const result =
      dfs(i, r + 1, c) ||
      dfs(i, r - 1, c) ||
      dfs(i, r, c + 1) ||
      dfs(i, r, c - 1);

    // Back track:
    visited.delete(pos);
    return result;
  }
}
const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  word = 'ABCCED';
console.log(exist(board, word));
