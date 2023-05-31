// Walls and Gates

/**
 * You are given an m x n grid rooms initialized with these three possible values.

-1 A wall or an obstacle.
0 A gate.
INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

 

Example 1:


Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
Example 2:

Input: rooms = [[-1]]
Output: [[-1]]
 

Constraints:

m == rooms.length
n == rooms[i].length
1 <= m, n <= 250
rooms[i][j] is -1, 0, or 231 - 1.
 */

// BFS question
// Time Complexity: O(n*m)
// Space Complexity: O(n*m)
function wallsAndGates(rooms) {
  const row = rooms.length;
  const col = rooms[0].length;

  // Loop through all rooms to get all gates
  let gates = [];
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (!rooms[r][c]) gates.push([r, c]);
    }
  }

  // BFS all gate and keep track of step
  let step = 0;
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  while (gates.length) {
    // Update step:
    step++;
    // Find new room with steps from the gate:
    const newGates = [];
    for (const [r, c] of gates) {
      for (const [x, y] of dirs) {
        // Calculate new position
        const newR = r + x;
        const newC = c + y;
        // Conditional case: if in bound, a room, update
        const rowInBound = newR >= 0 && newR < row;
        const colInBound = newC >= 0 && newC < col;
        if (rowInBound && colInBound && rooms[newR][newC] === 2147483647) {
          // Update room with step to gate
          rooms[newR][newC] = step;
          // Update newGate
          newGates.push([newR, newC]);
        }
      }
    }
    // Update the gate queue:
    gates = newGates;
  }
}
// rooms = [
//   [2147483647, -1, 0, 2147483647],
//   [2147483647, 2147483647, 2147483647, -1],
//   [2147483647, -1, 2147483647, -1],
//   [0, -1, 2147483647, 2147483647],
// ];
// wallsAndGates(rooms);
// console.table(rooms);
