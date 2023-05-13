/*
You are given an array of integers with both positive and negative numbers.
A valid subarray is any slice of consecutive elements from the array.
(
  e.g. the following are some valid subarrays of [3, 11, 2, 7, 4]
  [3, 11, 2]
  [11, 2, 7]
  [2]
  [3, 11, 2, 7, 4]
)
Find the subarray with the largest sum from the input array.

e.g.
input = [1, -2, 3, 10, -4, 7, 2, -5]
maxSubarray(input); 
// returns 18 from subarray [3, 10, -4, 7, 2]

input2 = [15, 20, -5, 10]
maxSubarray(input2); 
// returns 40 from subarray [15, 20, -5, 10]
*/
// This is a sliding window problem
// Time Complexity: O(n) where n is the length of the arr
// Space Complexity: O(1) since we only have pointer, no caching or recursion
const maxSubarray = (arr) => {
  // Initialize max to track the maximum sum of a subarray
  let max = -Infinity;
  // Initialize left pointer
  let l = 0;
  // Initialize curSum
  let curSum = 0;
  // Loop the right pointer through the arr
  for (let r = 0; r < arr.length; r++) {
    // Update curSum
    curSum += arr[r];
    // If cur Sum<current value
    if (curSum < arr[r]) {
      // Move left pointer & update curSum
      l = r;
      curSum = arr[r];
    }
    // Update max if applicable
    max = Math.max(max, curSum);
  }
  return max;
};

// let input = [1, -2, 3, 10, -4, 7, 2, -5];
// console.log(maxSubarray(input));
// const input2 = [15, 20, -5, 10];
// console.log(maxSubarray(input2));
