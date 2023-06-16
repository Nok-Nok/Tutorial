// Permutations II

/**
 * Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// Time Complexity: O(nlogn+n!)
// Space Complexity: O(n)
var permuteUnique = function (nums) {
  // Sort nums
  nums.sort((a, b) => a - b);

  const perms = [[]];
  return dfs(0, nums, perms);

  function dfs(i, nums, perms) {
    // Base case: i exceed nums, end
    if (i == nums.length) return perms;

    // Recursive case:
    // Find the chunk of duplicate
    let l = i;
    let r = i;
    const chunk = [nums[l]];
    while (r < nums.length && nums[r + 1] == nums[l]) {
      chunk.push(nums[l]);
      r++;
    }

    const newPerms = [];
    for (const perm of perms) {
      newPerms.push(...combineArrs(0, perm, 0, chunk));
    }
    return dfs(r + 1, nums, newPerms);
  }
};
function combineArrs(i1, arr1, i2, arr2, combArr = [], result = []) {
  // Base case: end of both arr1 & arr2
  if (i1 === arr1.length && i2 === arr2.length) {
    result.push(combArr);
  }
  // Recursive case:
  // Option1 add arr1 element
  if (i1 < arr1.length)
    combineArrs(i1 + 1, arr1, i2, arr2, combArr.concat(arr1[i1]), result);
  // Option2 add arr2 element
  if (i2 < arr2.length)
    combineArrs(i1, arr1, i2 + 1, arr2, combArr.concat(arr2[i2]), result);
  return result;
}
nums = [1, 1, 2];
console.log(permuteUnique(nums));
nums = [1, 2, 3];
console.log(permuteUnique(nums));
