// Word Search

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
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
 */

// Time Complexity: O(m*n * 4^len) where m*n is the size of the board and len is the length of word
// Space Complexity: O(len) where len is the length of the word
function exist(board, word) {
  // Obtain row and col
  const row = board.length;
  const col = board[0].length;
  // Initialize visited:
  const visited = new Set();
  // Traver through the grid to find word
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;

  function dfs(r, c, i) {
    // Base case:
    // If i exceeds word length, found the word, return true
    if (i >= word.length) return true;
    // If not inbound, been visited, or not match with the letter return
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const pos = r + ',' + c;
    if (
      !rowInBound ||
      !colInBound ||
      visited.has(pos) ||
      board[r][c] != word[i]
    )
      return false;

    // Update visisted
    visited.add(pos);

    // Traverse and end the traverse if found true:
    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);

    // Back Tracking:
    visited.delete(pos);

    return found;
  }
}

(board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
]),
  (word = 'ABCCEDAS');
console.log(exist(board, word));
