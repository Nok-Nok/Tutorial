// Shortest Path in a Grid with Obstacles Elimination

/**
 * You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

 

Example 1:


Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
Output: 6
Explanation: 
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
Example 2:


Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
Output: -1
Explanation: We need to eliminate at least two obstacles to find such a walk.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 40
1 <= k <= m * n
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0
 */

// THIS A BFS QUESTION
function shortestPath(grid, k) {
  // Obtain grid size
  const row = grid.length;
  const col = grid[0].length;
  // Intiailize the queue
  // Edge Case for only 1 square:
  if (row === 1 && col === 1) return k - grid[0][0] >= 0 ? 0 : -1;
  const queue = [[0, 0, k - grid[0][0]]];
  const visited = new Set(['0,0']);
  // Create an array of directions
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  // Intialize step to track number of steps
  let step = 0;
  // BFS to find shortest path
  while (queue.length) {
    const length = queue.length;
    step++;
    const queueHash = {};
    for (let i = 0; i < length; i++) {
      // Get the through all current positions that can reach by the same # of steps in the queue & update queue:
      const [r, c, k] = queue.shift();
      for (const [x, y] of dirs) {
        const newR = r + x;
        const newC = c + y;
        // Base case if out of bound, skip to next direction
        const rowInBound = newR >= 0 && newR < row;
        const colInbOubnd = newC >= 0 && newC < col;
        if (!rowInBound || !colInbOubnd) continue;
        // Base case: if meet block and k =0, skip to next direction
        if (k === 0 && grid[newR][newC]) continue;
        // Base case: if meet m-1,n-1, return step
        if (newR === row - 1 && newC === col - 1) return step;
        // Base case: if visited and position is not in current hash, skip to next direction
        const pos = newR + ',' + newC;
        if (visited.has(pos) && !(pos in queueHash)) continue;
        //Recursive case: update visited set and push the new position with updated k
        visited.add(pos);
        queueHash[pos] = Math.max(queueHash[pos] ?? 0, k - grid[newR][newC]);
      }
    }
    // console.log(queueHash);
    // Convert the queueHash to queue
    Object.entries(queueHash).forEach(([pos, k]) => {
      let [r, c] = pos.split(',');
      r = Number(r);
      c = Number(c);
      queue.push([r, c, k]);
    });
  }

  // If not possible, return -1
  return -1;
}
grid = [
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 0],
];
k = 1;
console.log(shortestPath(grid, k));
