// Container With Most Water
/**
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

 

Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 

Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104
 */

// Time Complexity: O(n) where n is the length of the height array
// Space Complexity: O(1)
function maxArea(height) {
  // Initialize left & right pointers
  let left = 0;
  let right = height.length - 1;
  // Initialize maxArea
  let area = 0;

  // While left<right:
  while (left < right) {
    // Obtain left & right height
    const hL = height[left],
      hR = height[right];
    // if hL > hR
    if (hL > hR) {
      // Update max area as needed
      area = Math.max(area, hR * (right - left));
      // move right pointer
      right--;
    }
    // else
    else {
      // Update max area as needed
      area = Math.max(area, hL * (right - left));
      // move left pointer
      left++;
    }
  }
  // return maxArea
  return area;
}

// height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
// console.log(maxArea(height));
// height = [1, 1];
// console.log(maxArea(height));
