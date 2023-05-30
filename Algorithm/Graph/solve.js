// Surrounded Regions

/**
 * Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

 

Example 1:


Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.
Example 2:

Input: board = [["X"]]
Output: [["X"]]
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] is 'X' or 'O'.
 */

// BFS:
// Time Complexity: O(n*m) since we traverse through every cells
// Space Complexity: O(n*m) since we have a set to store visited cell and we also have a queue for BFS
function solve1(board) {
  const row = board.length;
  const col = board[0].length;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (board[r][c] === 'O') {
        bfs([[r, c]], row, col, board);
      }
    }
  }
  return board;
}

function bfs(queue, row, col, board) {
  const visited = new Set();
  while (queue.length) {
    const [r, c] = queue.shift();
    // Base case: if find an X or has been visited, skip
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const pos = r + ',' + c;
    if (!rowInBound || !colInBound || board[r][c] === 'X' || visited.has(pos))
      continue;
    // Base case: if reach the edge, end the search
    if (r === 0 || r === row - 1 || c === 0 || c === col - 1) return;
    // Recursive case, add a 4 direction
    visited.add(pos);
    queue.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
  }
  // Update the board
  visited.forEach((pos) => {
    const [r, c] = pos.split(',');
    board[r][c] = 'X';
  });
}

// DFS
// Time Complexity: O(n*m) since we may traverse this matrix twice
// Space Complexity: O(n*m) for recursion stack
function solve(board) {
  const row = board.length;
  const col = board[0].length;
  // Flip all cells next to edge of the board from O to T
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (!r || !c || r === row - 1 || c === col - 1)
        dfs(r, c, row, col, board);
    }
  }
  // Flip T cell to O and O to X
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'T') board[r][c] = 'O';
    }
  }
  return board;
}

function dfs(r, c, row, col, board) {
  // Base case: if not inbound or  not O
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  if (!rowInBound || !colInBound || board[r][c] !== 'O') return;

  //Traverse remaining location
  // Flip board to T
  board[r][c] = 'T';
  dfs(r + 1, c, row, col, board);
  dfs(r - 1, c, row, col, board);
  dfs(r, c + 1, row, col, board);
  dfs(r, c - 1, row, col, board);
}

board = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
];

console.log(solve(board));
