// Subsets II

/**
 * Given an integer array nums that may contain duplicates, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
 */

// Space Complexity: O(N) where N is number of elements in nums
// Time Complexity: O(2^N * N) where N is number of elements in nums. 2^N for number of decisions, since each decision, we will make a copy of the combination, so that add another O(N) for each decision => 2^N * N

function subsetsWithDup(nums) {
  // Sort nums ascendingly
  nums.sort((a, b) => a - b);
  const result = [];
  const comb = [];
  dfs(0);
  return result;
  function dfs(i) {
    // Base case: if i exceed num length, push to result
    if (i >= nums.length) return result.push([...comb]);

    // Recursive case:
    // Option 1: push number to comb
    comb.push(nums[i]);
    dfs(i + 1);
    // Option 2: skip the number
    comb.pop();
    while (nums[i + 1] === nums[i] && i + 1 < nums.length) i++;
    dfs(i + 1);
  }
}

// nums = [1, 2, 2, 3, 3];
// console.log(subsetsWithDup(nums));
