// Subsets

/**
 * Given an integer array nums of unique elements, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
 */

function subsets(nums) {
  const result = [];
  dfs(0, []);
  return result;
  function dfs(i, subarr) {
    // Base case, if i exceeds nums length, return
    if (i >= nums.length) return result.push(subarr);

    // Recursive call
    // Option 1: add current num to subarr
    dfs(i + 1, subarr.concat(nums[i]));
    // Option 2: not add current num to subarr
    dfs(i + 1, subarr);
  }
}

// nums = [1, 2, 3];
// console.log(subsets(nums));
