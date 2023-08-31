// 733. Flood Fill

/**
 * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

 

Example 1:


Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
Example 2:

Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored 0, so no changes are made to the image.
 

Constraints:

m == image.length
n == image[i].length
1 <= m, n <= 50
0 <= image[i][j], color < 216
0 <= sr < m
0 <= sc < n
 */

// Time Complexity: O(n*m) since we traverse each grid once
// Space Complexity: O(n*m) for recursively traverse the matrix
function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const row = image.length;
  const col = image[0].length;
  const target = image[sr][sc];
  // Edge case: if color already match no change
  if (target === color) return image;
  dfs(sr, sc);
  return image;

  function dfs(r: number, c: number): void {
    // Base Case
    // If value not match or if out of bound, return
    const rowInBound = r >= 0 && r < row;
    const colInBound = c >= 0 && c < col;
    if (!rowInBound || !colInBound || image[r][c] !== target) return;

    // Recursive Case:
    // Upadte the color
    image[r][c] = color;
    // Traverse left right up down
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
}
const image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ],
  sr = 1,
  sc = 1,
  color = 2;
console.log(floodFill(image, sr, sc, color));
