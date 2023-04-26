// Trapping Rain Water
/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

 

Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
 */
// Space Complexity: O(n) where n is length of height
// Time Complexity: O(2n) where n is length of height
function trap1(height) {
  // Traverse right to left to find right Area
  let rightArea = [];
  let maxHeight = -Infinity;
  for (let i = height.length - 1; i >= 0; i--) {
    // Find the area for each block
    if (maxHeight > height[i]) rightArea[i] = maxHeight - height[i];
    else {
      maxHeight = height[i];
      rightArea[i] = 0;
    }
  }
  // Traverse left to right to find min Area between left and right traversal
  let area = 0;
  maxHeight = -Infinity;
  for (let i = 0; i < height.length; i++) {
    // Find the area for each block
    if (maxHeight > height[i])
      area += Math.min(maxHeight - height[i], rightArea[i]);
    else maxHeight = height[i];
  }

  return area;
}

// Two pointer approach
// Space Complexity: O(1) 
// Time Complexity: O(n) where n is length of height
function trap(height) {
    // Initialize area
    let area = 0;
    // Initialize left and right pointers
    let left = 0;
    let right = height.length - 1;
    // Initialize left and right height max
    let leftMax = height[left];
    let rightMax = height[right];
    // While left<right
    while (left < right) {
        // If leftMax<rightMax
        if (leftMax < rightMax) {
            // Increment left
            left++;
            // If left height increase
            // Update left max
            // Else
            // Update area
            height[left] > leftMax
            ? (leftMax = height[left])
            : (area += leftMax - height[left]);
        }
        // Else
        else {
            // Decrement right
            right--;
            // If right height increase
            // Update right max
            // Else
            // Update area
            height[right] > rightMax
            ? (rightMax = height[right])
            : (area += rightMax - height[right]);
        }
    }
    // Return area
    return area;
}

height = [0, 1, 2, 3, 2, 0, 1, 2, 5, 7, 0, 2, 1];
console.log(trap(height));