// 417. Pacific Atlantic Water Flow

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
*/
// ----------------------------BFS Approach------------------------
// Time Complexity: O(3(n*m)) : 1 for pacific, 1 for atlantic, 1 for get final result
// Space Complexity: O(2(n*m)) for the two flowable matrix + O(2 * max(n,m)) for queue in BFS
function pacificAtlantic(heights: number[][]): number[][] {
  const row = heights.length;
  const col = heights[0].length;
  // Find cells that can flow to Pacific
  // Intial all to false and will update with BFS
  const flowToPacific: boolean[][] = new Array(row)
    .fill(0)
    .map((e) => new Array(col).fill(false));
  // Find cell that can flow to Atlantic
  // Intial all to false and will update with BFS
  const flowToAtlantic: boolean[][] = new Array(row)
    .fill(0)
    .map((e) => new Array(col).fill(false));
  // Cells top row and left column would be T for flowToPacific
  // Cells bottom row and right column would be T for flowToPacific
  const queueP: number[][] = [];
  const queueA: number[][] = [];
  for (let r = 0; r < row; r++) {
    queueA.push([r, col - 1, heights[r][col - 1]]);
    queueP.push([r, 0, heights[r][0]]);
  }
  for (let c = 0; c < col; c++) {
    queueA.push([row - 1, c, heights[row - 1][c]]);
    queueP.push([0, c, heights[0][c]]);
  }
  bfs(queueP, row, col, heights, flowToPacific);
  bfs(queueA, row, col, heights, flowToAtlantic);
  // console.table(flowToPacific);
  // console.table(flowToAtlantic);

  const result: number[][] = [];
  // Find cells that can flow to both
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (flowToAtlantic[r][c] && flowToPacific[r][c]) result.push([r, c]);
    }
  }
  // May be able to optimize to only 2 array
  return result;
}

function bfs(
  queue: number[][],
  row: number,
  col: number,
  heights: number[][],
  flowAble: boolean[][]
) {
  while (queue.length) {
    // Obtain next pos
    let newQueue: number[][] = [];
    // Loop through queue
    while (queue.length) {
      const [r, c, prevHeight] = queue.pop() as [number, number, number];
      // Base case:
      // If this position have been evaluated for flowable
      // If out of bound, curHeight<preHeight, is already true: skip
      const rowInBound = r >= 0 && r < row;
      const colInBound = c >= 0 && c < col;
      const curHeight = rowInBound && colInBound ? heights[r][c] : -Infinity;
      if (curHeight < prevHeight || flowAble[r][c]) continue;
      // Recursive case:
      flowAble[r][c] = true;
      // Loop through all direction
      newQueue.push(
        [r - 1, c, curHeight],
        [r + 1, c, curHeight],
        [r, c - 1, curHeight],
        [r, c + 1, curHeight]
      );
    }
    // Update cur
    [newQueue, queue] = [queue, newQueue];
  }
}
// ----------------------------DFS Approach------------------------
// Time Complexity: O(3(n*m)) : 1 for pacific, 1 for atlantic, 1 for get final result
// Space Complexity: O(2(n*m)) for the two flowable matrix + O(2 * (m*n)) for recursion stack of visiiting all the cells
// function pacificAtlantic(heights: number[][]): number[][] {
//   const row = heights.length;
//   const col = heights[0].length;
//   // Find cells that can flow to Pacific
//   // Intial all to false and will update with DFS
//   const flowToPacific: boolean[][] = new Array(row)
//     .fill(0)
//     .map((e) => new Array(col).fill(false));
//   // Find cell that can flow to Atlantic
//   // Intial all to false and will update with DFS
//   const flowToAtlantic: boolean[][] = new Array(row)
//     .fill(0)
//     .map((e) => new Array(col).fill(false));
//   // Cells top row and left column would be T for flowToPacific
//   // Cells bottom row and right column would be T for flowToAtlantic
//   for (let r = 0; r < row; r++) {
//     dfs(r, 0, row, col, heights, -Infinity, flowToPacific);
//     dfs(r, col - 1, row, col, heights, -Infinity, flowToAtlantic);
//   }
//   for (let c = 0; c < col; c++) {
//     dfs(0, c, row, col, heights, -Infinity, flowToPacific);
//     dfs(row - 1, c, row, col, heights, -Infinity, flowToAtlantic);
//   }
//   const result: number[][] = [];
//   // console.table(flowToPacific);
//   // console.table(flowToAtlantic);

//   // Find cells that can flow to both
//   for (let r = 0; r < row; r++) {
//     for (let c = 0; c < col; c++) {
//       if (flowToAtlantic[r][c] && flowToPacific[r][c]) result.push([r, c]);
//     }
//   }
//   // May be able to optimize to only 2 array
//   return result;
// }
// function dfs(
//   r: number,
//   c: number,
//   row: number,
//   col: number,
//   heights: number[][],
//   prevHeight: number,
//   flowAble: boolean[][]
// ) {
//   // Base case:
//   // Out of bound or has visited or curHeight<prevHeight
//   const rowInBound = r >= 0 && r < row;
//   const colInBound = c >= 0 && c < col;
//   const curHeight = rowInBound && colInBound ? heights[r][c] : -Infinity;
//   if (curHeight < prevHeight || flowAble[r][c]) return;

//   // Recursive case:
//   flowAble[r][c] = true;
//   // Traverse left right up down
//   dfs(r - 1, c, row, col, heights, curHeight, flowAble);
//   dfs(r + 1, c, row, col, heights, curHeight, flowAble);
//   dfs(r, c - 1, row, col, heights, curHeight, flowAble);
//   dfs(r, c + 1, row, col, heights, curHeight, flowAble);
// }

const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];

console.log(pacificAtlantic(heights));
