//  Word Search II

/**
 * Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
 */

function TrieNode() {
  this.children = {};
  this.end = false;
}

function Trie() {
  this.root = new TrieNode();
}

Trie.prototype.add = function (word) {
  let cur = this.root;
  for (const letter of word) {
    // If letter is not in the children, add it
    if (!(letter in cur.children)) cur.children[letter] = new TrieNode();
    // Move to next letter
    cur = cur.children[letter];
  }
  cur.end = true;
};

function findWords(board, words) {
  // Construct a tries for words
  const trie = new Trie();
  // Add words to the trie
  words.forEach((word) => trie.add(word));
  // Intialize a result array
  const result = [];
  // Traverse through the board
  const row = board.length;
  const col = board[0].length;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // DFS
      dfs(r, c, row, col, '', trie.root, new Set());
    }
  }

  function dfs(r, c, row, col, word, cur, visited) {
    // Base case if out of bound, been visited or not exist in the children, return
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const pos = r + ',' + c;
    if (
      !rowInBound ||
      !colInBound ||
      visited.has(pos) ||
      !(board[r][c] in cur.children)
    )
      return;

    // Update a clone of visited set
    visited.add(pos);

    // Update cur & word:
    word += board[r][c];
    cur = cur.children[board[r][c]];
    if (cur.end) {
      cur.end = false;
      result.push(word);
    }

    // Traverse left, right, up, down
    dfs(r, c - 1, row, col, word, cur, visited);
    dfs(r, c + 1, row, col, word, cur, visited);
    dfs(r - 1, c, row, col, word, cur, visited);
    dfs(r + 1, c, row, col, word, cur, visited);

    // After visitted all subsequent letters, delete pos from visited, so this pos can be reused for a different route
    visited.delete(pos);
  }
  return result;
}

board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v'],
];
words = ['hklf', 'hf'];
console.log(findWords(board, words));
