// Combination Sum II

/**
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

 

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
 */

// Time Complexity: O(2^N) where N is the number of candidates
// Space Complexity: O(N) where N is the number of candidates
function combinationSum2(candidates, target) {
  // Sort the candidates
  candidates.sort((a, b) => a - b);
  // Initialize a result arr:
  const result = [];
  const comb = [];
  dfs(0, target);
  return result;
  function dfs(i, remaining) {
    // If remaining is 0, push comb to the result
    if (remaining === 0) return result.push([...comb]);
    // If i exceed the candidates or remaininng<0, return
    if (i >= candidates.length || remaining < 0) return;

    // Recursive case:
    // Option 1: Use the number
    comb.push(candidates[i]);
    dfs(i + 1, remaining - candidates[i]);
    // Option 2: Skip the number
    comb.pop();
    while (i + 1 < candidates.length && candidates[i + 1] === candidates[i]) {
      i++;
    }
    dfs(i + 1, remaining);
  }
}

// (candidates = [10, 1, 2, 7, 6, 1, 5]), (target = 8);
// console.log(combinationSum2(candidates, target));
