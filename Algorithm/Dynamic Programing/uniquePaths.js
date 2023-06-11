// Unique Paths

/**
 * There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
 

Constraints:

1 <= m, n <= 100
 */
// DP bottom up:
// Time Complexity: O(n*m)
// Space Complexity: O(n)
function uniquePaths(m, n) {
  // Intiialize array to track unique paths to get to the bottom right corner
  let bottom = new Array(n).fill(0);
  bottom[n - 1] = 1;
  // Loop thorugh each row to get # unique paths from bottom row up
  for (let r = 0; r < m; r++) {
    const top = new Array(n);
    top[n - 1] = 1;
    for (let c = n - 2; c >= 0; c--) {
      // Num of unique path bottom right = bottom combs + right combs
      top[c] = top[c + 1] + bottom[c];
    }
    bottom = top;
  }
  return bottom[0];
}

// This approach may save half of space complexity, but may not ideal for interview
function uniquePaths(m, n) {
  // Intiialize array to track unique paths to get to the bottom right corner
  let bottom = new Array(n).fill(0);
  bottom[n - 1] = 1;
  // Loop through each row to get # unique paths from bottom row up
  for (let r = 0; r < m; r++) {
    for (let c = n - 2; c >= 0; c--) {
      // Num of unique path bottom right = bottom combs + right combs
      bottom[c] += bottom[c + 1];
    }
  }
  return bottom[0];
}
(m = 3), (n = 7);
console.log(uniquePaths(m, n));
