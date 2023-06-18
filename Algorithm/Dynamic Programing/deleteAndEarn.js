// Delete and Earn

/**
 * You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:

Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
Return the maximum number of points you can earn by applying the above operation some number of times.

 

Example 1:

Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
Example 2:

Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i] <= 104
 */

var deleteAndEarn = function (nums) {
  // Sort the nums array ascendingly
  nums.sort((a, b) => a - b);
  // Obtain the frequency of each number
  const freq = new Map(); //num: frequency
  nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + num));
  // Convert the map to an array
  const numArr = [[0, 0], [0, 0], ...freq]; //num: total
  // Loop through the array to calculate the max tot we can get at each position
  for (let i = 2; i < numArr.length; i++) {
    // f(n-1)+Earn if n-1 not consecutive
    const prevTot1 =
      numArr[i - 1][1] +
      (numArr[i][0] - numArr[i - 1][0] > 1 ? numArr[i][1] : 0);
    // f(n-2)+Earn
    const prevTot2 = numArr[i - 2][1] + numArr[i][1];
    // f(n) = Max (f(n-1)+Earn if n-1 not consecutive, f(n-2)+Earn)
    numArr[i][1] = Math.max(prevTot1, prevTot2);
  }
  return numArr.pop()[1];
};

// Time Complexity: O(nlogn + n) for sorting and and for looping through the array to get total
// Space Complexity: O(logn) for sorting. Since prev1 and prev2 are fixed length arrays, no additional storage there.
var deleteAndEarn = function (nums) {
  // Sort the nums array ascendingly
  nums.sort((a, b) => a - b);
  let prev1 = [0, 0];
  let prev2 = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    // Get the current val and the current total of all duplicate values
    const curVal = nums[i];
    let curTot = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === curVal) {
      i++;
      curTot += curVal;
    }
    // Find the max current total
    // f(n) = Max (f(n-1)+Earn if n-1 not consecutive, f(n-2)+Earn)
    curTot = Math.max(
      prev1[1] + (curVal - prev1[0] > 1 ? curTot : 0),
      prev2[1] + curTot
    );
    // Update prev1 & prev2
    prev2 = prev1;
    prev1 = [curVal, curTot];
  }
  return prev1[1];
};
nums = [2, 2, 3, 3, 3, 4];
console.log(deleteAndEarn(nums));
nums = [3, 4, 2];
console.log(deleteAndEarn(nums));
nums = [3, 1];
console.log(deleteAndEarn(nums));
nums = [8, 10, 4, 9, 1, 3, 5, 9, 4, 10];
console.log(deleteAndEarn(nums));
