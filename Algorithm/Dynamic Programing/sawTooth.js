/**
 * Given an array of integers arr, your task is to count the number of contiguous subarrays that represent a sawtooth sequence of at least two elements.

For arr = [9, 8, 7, 6, 5], the output should be countSawSubarrays(arr) = 4. Since all the elements are arranged in decreasing order, it won’t be possible to form any sawtooth subarray of length 3 or more. There are 4 possible subarrays containing two elements, so the answer is 4.

For arr = [10, 10, 10], the output should be countSawSubarrays(arr) = 0. Since all of the elements are equal, none of subarrays can be sawtooth, so the answer is 0.

For arr = [1, 2, 1, 2, 1], the output should be countSawSubarrays(arr) = 10.

All contiguous subarrays containing at least two elements satisfy the condition of the problem. There are 10 possible contiguous subarrays containing at least two elements, so the answer is 10.

A sawtooth sequence is a sequence of numbers that alternate between increasing and decreasing. In other words, each element is either strictly greater than its neighboring elements or strictly less than its neighboring elements.
 */
// Sliding window
function sawTooth(arr) {
  // Edge case when arr length is less than 2
  if (arr.length < 2) return 0;
  const dp = new Array(arr.length - 1).fill(0);
  dp[dp.length - 1] = arr[arr.length - 2] === arr[arr.length - 1] ? 0 : 1;
  let tot = dp[dp.length - 1];
  let len = arr[arr.length - 2] === arr[arr.length - 1] ? 1 : 0;
  // Traverse from end to beginning
  for (let i = dp.length - 2; i >= 0; i--) {
    // f(n) = previous + dip/tip (the diff flip sign)
    if (
      (arr[i] - arr[i + 1]) * (arr[i + 1] - arr[i + 2]) < 0 ||
      (arr[i] !== arr[i + 1] && arr[i + 1] === arr[i + 2])
    ) {
      dp[i] = dp[i + 1] + 1 + len;
      len = 0;
    } else {
      dp[i] = dp[i + 1];
      len++;
    }
    tot += dp[i];
  }
  return tot;
}

function sawTooth(arr) {
  let cur = arr[0] === arr[1] ? 0 : 1;
  let tot = cur;
  for (let i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) * (arr[i - 1] - arr[i - 2]) < 0) cur++;
    else cur = arr[i] === arr[i - 1] ? 0 : 1;

    tot += cur;
  }
  return tot;
}
arr = [9, 8, 7, 6, 5];
console.log(sawTooth(arr));
arr = [7, 5, 6, 7, 8, 9];
console.log(sawTooth(arr));
arr = [1, 2, 1, 2, 1];
console.log(sawTooth(arr));
arr = [1, 2, 2, 2, 1];
console.log(sawTooth(arr));

arr = [11, 10, 10, 10, 10];
console.log(sawTooth(arr));
arr = [11, 10, 10, 10, 10, 11];
console.log(sawTooth(arr));
