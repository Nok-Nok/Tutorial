// Combination Sum

/**
 * Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
frequency
 of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40
 */

function combinationSum1(candidates, target) {
  const result = [];
  dfs(0, [], target);
  return result;
  function dfs(i, combSum, remaining) {
    // Base Case:
    // If remaning <0 or out of coins (i exceed nums length), end the search
    if (remaining < 0 || i >= candidates.length) return;
    // If remaining = 0, push the copy combination to result
    if (remaining === 0) return result.push(combSum);

    // Recursive Case:
    // Update my combSum
    // Option 1: Use the current coin
    dfs(i, combSum.concat(candidates[i]), remaining - candidates[i]);
    // Option 2: Use the next coin
    dfs(i + 1, combSum, remaining);
  }
}
// Time Complexity: O(N^(T/M)) where N is number of elements in candidates array, T is the target, M is the minimum value
// Space Complexity: O(T/M) where T is target and M is the minimum value in candidates array
function combinationSum(candidates, target) {
  const result = [];
  const combSum = [];
  dfs(0, target);
  return result;
  function dfs(i, remaining) {
    // Base Case:
    // If remaning <0 or out of coins (i exceed nums length), end the search
    if (remaining < 0 || i >= candidates.length) return;
    // If remaining = 0, push the copy combination to result
    if (remaining === 0) return result.push(combSum.slice());

    // Recursive Case:
    // Update my combSum
    // Option 1: Use the current coin
    combSum.push(candidates[i]);
    dfs(i, remaining - candidates[i]);
    // Option 2: Use the next coin
    combSum.pop();
    dfs(i + 1, remaining);
  }
}

// (candidates = [2, 3, 6, 7]), (target = 7);
// console.log(combinationSum(candidates, target));
