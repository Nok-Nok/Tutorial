// Tallest Billboard

/**
 * You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.

You are given a collection of rods that can be welded together. For example, if you have rods of lengths 1, 2, and 3, you can weld them together to make a support of length 6.

Return the largest possible height of your billboard installation. If you cannot support the billboard, return 0.

 

Example 1:

Input: rods = [1,2,3,6]
Output: 6
Explanation: We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.
Example 2:

Input: rods = [1,2,3,4,5,6]
Output: 10
Explanation: We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.
Example 3:

Input: rods = [1,2]
Output: 0
Explanation: The billboard cannot be supported, so we return 0.
 

Constraints:

1 <= rods.length <= 20
1 <= rods[i] <= 1000
sum(rods[i]) <= 5000
 */

/**
 * @param {number[]} rods
 * @return {number}
 */
var tallestBillboard = function (rods) {
  const cache = {};
  return dfs(rods, 0, 0, 0);
  function dfs(rods, i, stack1, stack2) {
    // Base case: end of rods
    if (i === rods.length) return stack1 === stack2 ? stack1 : 0;
    // Base case: if in cache, return cache
    const key = i + ',' + stack1 + ',' + stack2;
    if (key in cache) return cache[key];

    // Recursive case:
    // Option 1: add to stack 1
    const op1 = dfs(rods, i + 1, stack1 + rods[i], stack2);
    // Option 2: add to stack 2
    const op2 = dfs(rods, i + 1, stack1, stack2 + rods[i]);
    // Option 3: skip
    const skip = dfs(rods, i + 1, stack1, stack2);

    return (cache[key] = Math.max(op1, op2, skip));
  }
};
var tallestBillboard = function (rods) {
  let dp = { 0: 0 }; // difference: taller stack

  for (const rod of rods) {
    const newDp = { ...dp };
    for (let [diff, taller] of Object.entries(dp)) {
      diff = Number(diff);
      // Stack the rod to the taller stack
      // Update dp for the difference + rod height: only keep the max
      newDp[diff + rod] = Math.max(newDp[diff + rod] ?? 0, rod + taller);

      // Stack the rod to the shorter stack
      const shorter = taller - diff;
      const newTaller = Math.max(shorter + rod, taller);
      const newDiff = Math.abs(shorter + rod - taller);
      // Update dp for the difference + rod height: only keep the max
      newDp[newDiff] = Math.max(newDp[newDiff] ?? 0, newTaller);
    }
    dp = newDp;
  }
  return dp[0];
};
rods = [1, 2, 3, 6];
console.log(tallestBillboard(rods));
rods = [1, 2, 3, 4, 5, 6];
console.log(tallestBillboard(rods));
rods = [1, 2];
console.log(tallestBillboard(rods));
