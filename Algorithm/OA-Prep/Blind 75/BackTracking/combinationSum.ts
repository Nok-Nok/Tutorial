// 39. Combination Sum

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

// Do using 1D DP array
// Time Complexity: O(c * t) where c is number of candidates and t is the target
// Space Complexity: O(t * max number of combaination) where t is the target
function combinationSum(candidates: number[], target: number): number[][] {
  const dp: number[][][] = new Array(target + 1).fill(0).map((e) => []);
  // For target of 0, we would have 1 option of not using any candidate
  dp[0].push([]);
  // Loop throuhg all candidates
  for (const candidate of candidates) {
    // Update the arrya from num value
    for (let i = candidate; i <= target; i++) {
      // Update dp:
      for (const option of dp[i - candidate]) {
        dp[i].push(option.concat(candidate));
      }
    }
  }
  // console.table(dp);
  return dp[target];
}
// Try backtracking
// Time Complexity: O(choice^height) where height = target/min(candidates) and choices are number of the candidate.
// Space Complexity: O(h) where height = target/min(candidates) for recursion stack
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  dfs(0, [], target);
  return result;
  function dfs(i: number, comb: number[], target: number) {
    // Base case:
    // Target <0, return
    if (target < 0) return;
    // Target = 0, push the combination to result
    if (target === 0) return result.push([...comb]);

    // Recursive case:
    // Loop throuhg option
    for (let j = i; j < candidates.length; j++) {
      // Udpate the comb & target
      comb.push(candidates[j]);
      dfs(j, comb, target - candidates[j]);
      // Backtrack
      comb.pop();
    }
  }
}
const candidates = [2, 3, 6, 7],
  target = 7;
console.log(combinationSum(candidates, target));
