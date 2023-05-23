// Permutations

/**
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
 */

function permute1(nums) {
  const visisted = new Set();
  const perm = [];
  const result = [];
  dfs(perm);
  return result;
  function dfs(perm) {
    // Base case: when perm length is equal to nums length, push the copy
    if (perm.length === nums.length) return result.push([...perm]);

    // Recursive case
    for (let i in nums) {
      // If value has been used, skipped
      if (visisted.has(i)) continue;
      // Update visisted and perm
      visisted.add(i);
      perm.push(nums[i]);
      dfs(perm);
      // Back Tracking
      visisted.delete(i);
      perm.pop();
    }
  }
}


// Time Complexity: 
// Space Complexity: O(N) for recursion + O(N * N!) for amount of combination => O(N * N!)
function permute(nums) {
  const perm = [];
  const result = [];
  dfs(perm);
  return result;
  function dfs(perm) {
    // Base case: when we used all values in num array
    if (!nums.length) return result.push([...perm]);

    // Recursive case
    for (let i = 0; i < nums.length; i++) {
      // Grab the first value and push to perm
      const num = nums.shift();
      perm.push(num);
      // Recursive
      dfs(perm);
      // Back Tracking
      perm.pop();
      nums.push(num);
    }
  }
}
nums = [1, 2, 3];
console.log(permute(nums));
