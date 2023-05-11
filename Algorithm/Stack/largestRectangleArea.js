// Largest Rectangle in Histogram
/**
 * Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104
 */
// Space complexity: O(n) where n is length of height if all height increasing
// Time complexity: O(n) for n number of push and n number of pop.
function largestRectangleArea(heights) {
  // Initialize a stack to store increasing height
  const stack = [];
  let maxArea = 0;
  // Push a 0 to find the last height if stack still have any height left
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    // If height decrese:
    while (stack.length && heights[i] < stack[stack.length - 1][0]) {
      // Grab the most recent height in stack
      const [height, iH] = stack.pop();
      // Update maxArea
      maxArea = Math.max(maxArea, height * (i - iH));
      // Move the start pointer
      start = iH;
    }
    stack.push([heights[i], start]);
  }
  return maxArea;
}

// heights = [2, 1, 5, 6, 2, 3];
// console.log(largestRectangleArea(heights));
// heights = [2, 1, 2];
// console.log(largestRectangleArea(heights));
// heights = [3, 6, 5, 7, 4, 8, 1, 0];
// console.log(largestRectangleArea(heights));
