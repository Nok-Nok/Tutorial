// Triangle

/**
 * Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

 

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
Example 2:

Input: triangle = [[-10]]
Output: -10
 

Constraints:

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 */
// Try 1DP TOP DOWN APPROACH
/**
 * @param {number[][]} triangle
 * @return {number}
 */
// Time Complexity: O(N) where N is the size of the triangle
// Space Complexity: O(W) where W is the max with of the triangle (length of the last array)
var minimumTotal = function (triangle) {
  const row = triangle.length;
  const col = triangle[row - 1].length;
  // Intialize dp
  const dp = new Array(col).fill(Infinity); //We can't travel just yet
  // Intiialize starting position
  dp[0] = 0; //Start position would cost 0 + cur value to travel to
  dp[-1] = Infinity; //We cannot travel pass index 0

  // Traver through the grid top->down, right->left since we need to use dp[c-1]
  for (let r = 0; r < row; r++) {
    for (let c = triangle[r].length - 1; c >= 0; c--) {
      // Min Cost = cur cost + travel top left || top
      // f(n) = cur + min(up left, up)
      dp[c] = triangle[r][c] + Math.min(dp[c - 1], dp[c]);
    }
    // console.table([dp]);
  }
  return Math.min(...dp);
};

// triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
// console.log(minimumTotal(triangle));
