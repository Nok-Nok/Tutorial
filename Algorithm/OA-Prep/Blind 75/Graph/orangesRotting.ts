// 994. Rotting Oranges

/**
 * You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
 */
// Time Complexity: O(n*m) for getting fresh and rotten orranges + O(n*m) for bfs
// Space Complexity: O(n*m) for rotten orranges queue
function orangesRotting(grid: number[][]): number {
  const row = grid.length;
  const col = grid[0].length;
  // Loop throught eh grid to get all rotten orranges
  const rotten: number[][] = [];
  let fresh: number = 0;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === 2)
        rotten.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  // Perform BFS to spread the rotton
  return bfs(rotten);
  function bfs(rotten: number[][]) {
    let minutes = 0;
    while (rotten.length) {
      let newRotten: number[][] = [];
      // Spread the rotten
      while (rotten.length) {
        // Obtain the position
        const [r, c] = rotten.pop() as [number, number];
        // Base case: out of bound or not fresh
        const rowInBound = r >= 0 && r < row;
        const colInBound = c >= 0 && c < col;
        if (!rowInBound || !colInBound || grid[r][c] !== 1) continue;
        // Recursive case:
        grid[r][c] = 2;
        fresh--;
        newRotten.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }
      // Increase elapsed minutes if we get more rotten orranges
      if (newRotten.length) minutes++;
      [newRotten, rotten] = [rotten, newRotten];
    }
    return fresh > 0 ? -1 : minutes;
  }
}
const grid = [
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
];
console.log(orangesRotting(grid));
