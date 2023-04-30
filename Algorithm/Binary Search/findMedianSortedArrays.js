// Median of Two Sorted Arrays

/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
 */

function findMedianSortedArrays(nums1, nums2) {
  // Switch position to ensure nums1 length is smaller.
  // This is important because ...
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  // Calcualte total numbers and find the median half
  const total = nums1.length + nums2.length;
  const half = Math.floor(total / 2);

  // Intialize left and right pointer for nums1
  let left1 = 0;
  let right1 = nums1.length - 1;

  // While true
  while (true) {
    // Find mid point of nums1
    const mid1 = Math.floor((left1 + right1) / 2);
    // Find mid point of nums2
    const mid2 = half - mid1 - 2;

    // Left portion
    const nums1Left = nums1[mid1] ?? -Infinity;
    const nums2Left = nums2[mid2] ?? -Infinity;
    // Right portion
    const nums1Right = nums1[mid1 + 1] ?? Infinity;
    const nums2Right = nums2[mid2 + 1] ?? Infinity;
    
    if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
      if (total % 2) return Math.min(nums1Right, nums2Right);
      else {
        return (
          (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) /
          2
        );
      }
    } else if (nums2Left > nums1Right) {
      // Move left pointer of nums1
      left1 = mid1 + 1;
    } else right1 = mid1 - 1;
  }
}

// nums1 = [];
// nums2 = [1];
// console.log(findMedianSortedArrays(nums1, nums2));
