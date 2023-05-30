// Pacific Atlantic Water Flow

/**
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

 

Example 1:


Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
Example 2:

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 

Constraints:

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
 */

// BFS Approach:
// Time Complexity: O(3*n*m) where n*m is the size of the heights
// Space Complexity: O(2*n*m) where n*m is the size of the heights
function pacificAtlantic1(heights) {
  // Obtain rows and cols
  const row = heights.length;
  const col = heights[0].length;
  // Initialize matrix for tracking pacific and atlantic met:
  const matrix = new Array(row).fill(0).map((e) => new Array(col).fill(0));
  // Intialize a result array:
  const result = [];

  // BFS to find cell reach PACIFIC OCEAN:
  const queue = [];
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (!r || !c) {
        queue.push([r, c, -Infinity]);
      }
    }
  }
  bfs(queue, row, col, heights, matrix);

  // BFS to find cell reach ATLANTIC OCEAN:
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (r === row - 1 || c === col - 1) {
        queue.push([r, c, -Infinity]);
      }
    }
  }
  bfs(queue, row, col, heights, matrix);

  // Traverse through matrix and update result
  matrix.forEach((_, r) =>
    matrix[r].forEach((_, c) => {
      if (matrix[r][c] === 2) result.push([r, c]);
    })
  );
  return result;
}

function bfs(queue, row, col, heights, matrix) {
  const visited = new Set();
  while (queue.length) {
    const [r, c, prevHeight] = queue.shift();
    // Base case: If no inbound, already visited, or height increase skip
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    const pos = r + ',' + c;
    if (
      !rowInBound ||
      !colInBound ||
      visited.has(pos) ||
      heights[r][c] < prevHeight
    ) {
      continue;
    }
    // Recursive case: add all 4 positions
    visited.add(pos);
    matrix[r][c]++;
    const height = heights[r][c];
    queue.push(
      [r, c + 1, height],
      [r, c - 1, height],
      [r + 1, c, height],
      [r - 1, c, height]
    );
  }
}


// DFS Approach:
// Time Complexity: O(n*m) where n*m is the size of the heights
// Space Complexity: O(n*m) where n*m is the size of the heights
function pacificAtlantic(heights) {
  const row = heights.length;
  const col = heights[0].length;

  const pac = new Set();
  const atl = new Set();
  // Loop through col, and search for cell that reach either pacific or atlantic
  for (let c = 0; c < col; c++) {
    dfs(0, c, -Infinity, row, col, heights, pac);
    dfs(row - 1, c, -Infinity, row, col, heights, atl);
  }
  // Loop through row, and search for cell that reach either pacific or atlantic
  for (let r = 0; r < row; r++) {
    dfs(r, 0, -Infinity, row, col, heights, pac);
    dfs(r, col - 1, -Infinity, row, col, heights, atl);
  }
  // Loop through to update result array
  const result = [];
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      const pos = r + ',' + c;
      if (pac.has(pos) && atl.has(pos)) result.push([r, c]);
    }
  }
  return result;
}

function dfs(r, c, prevHeight, row, col, heights, visited) {
  // Base case: if out of bound, curHeigh<prevHeight or has been visited, return
  const rowInBound = r >= 0 && r < row;
  const colInBound = c >= 0 && c < col;
  const pos = r + ',' + c;
  if (
    !rowInBound ||
    !colInBound ||
    heights[r][c] < prevHeight ||
    visited.has(pos)
  )
    return;

  // Recursive case:
  const height = heights[r][c];
  visited.add(pos);
  dfs(r + 1, c, height, row, col, heights, visited);
  dfs(r - 1, c, height, row, col, heights, visited);
  dfs(r, c + 1, height, row, col, heights, visited);
  dfs(r, c - 1, height, row, col, heights, visited);
}
heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];
console.log(pacificAtlantic(heights));
