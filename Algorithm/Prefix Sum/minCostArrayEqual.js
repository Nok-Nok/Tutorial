// Minimum Cost to Make Array Equal

/**
 * You are given two 0-indexed arrays nums and cost consisting each of n positive integers.

You can do the following operation any number of times:

Increase or decrease any element of the array nums by 1.
The cost of doing one operation on the ith element is cost[i].

Return the minimum total cost such that all the elements of the array nums become equal.

 

Example 1:

Input: nums = [1,3,5,2], cost = [2,3,1,14]
Output: 8
Explanation: We can make all the elements equal to 2 in the following way:
- Increase the 0th element one time. The cost is 2.
- Decrease the 1st element one time. The cost is 3.
- Decrease the 2nd element three times. The cost is 1 + 1 + 1 = 3.
The total cost is 2 + 3 + 3 = 8.
It can be shown that we cannot make the array equal with a smaller cost.
Example 2:

Input: nums = [2,2,2,2,2], cost = [4,2,8,1,3]
Output: 0
Explanation: All the elements are already equal, so no operations are needed.
 

Constraints:

n == nums.length == cost.length
1 <= n <= 105
1 <= nums[i], cost[i] <= 106
 */

// Try prefix sum
/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
  // sort the nums & cost array based on num
  const numCost = nums.map((_, i) => [nums[i], cost[i]]);
  numCost.sort(([num1, _], [num2, __]) => num1 - num2);
  // Assume we start at i=0, find the suffix sum
  // Loop through numCost to calculate the min and the suffix cost
  const [initialNum, initialCost] = numCost[0];
  let prefix = initialCost;
  let suffix = 0;
  let curTot = 0;
  for (let i = 1; i < numCost.length; i++) {
    const [curNum, curCost] = numCost[i];
    curTot += (curNum - initialNum) * curCost;
    suffix += curCost;
  }

  // Intialize min, which is the current total if we decide to make all number the same as 1st num
  let min = curTot;

  // Loop through the numCost array from index 1
  for (let i = 1; i < numCost.length; i++) {
    const [curNum, curCost] = numCost[i];
    const [preNum, preCost] = numCost[i - 1];
    const delta = curNum - preNum;
    // Update curTot & min
    curTot += (prefix - suffix) * delta;
    min = Math.min(min, curTot);
    // Update prefix
    prefix += curCost;
    // Update suffix
    suffix -= curCost;
  }
  return min;
};

// (nums = [1, 3, 5, 2]), (cost = [2, 3, 1, 14]);
// console.log(minCost(nums, cost));
(nums = [4, 10]), (cost = [2, 1]);
console.log(minCost(nums, cost));
