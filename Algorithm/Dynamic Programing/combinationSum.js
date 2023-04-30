//  Combination Sum

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

// Time complexity: O(n * m) where n is the target, m is the number of candidates
// Space complexity: O(n) where n is the target
function combinationSum(candidates, target) {
  // Intialize array to store combination of each number
  // The index of the array stands for target value
  // Element in the array is the combination to meet that target
  const combinations = new Array(target + 1);
  // For target of zero, we know we will need 0 coins
  // => intialize with empty array for combination
  combinations[0] = [[]];
  // Loop through all candidate
  for (const num of candidates) {
    // Update the combination array for each target value
    for (let i = 1; i < combinations.length; i++) {
      // If there is any combination exist at target - current coin value
      if (combinations[i - num]) {
        // Update the combination
        const comb = combinations[i - num].map((e) => e.concat(num));
        // Update the combiantions array at target i
        combinations[i]
          ? combinations[i].push(...comb)
          : (combinations[i] = comb);
      }
    }
  }
  // Return result
  return combinations[target] || [];
}
// (candidates = [2, 3, 6, 7]), (target = 7);
// console.log(combinationSum(candidates, target));

// (candidates = [2, 3, 5]), (target = 8);
// console.log(combinationSum(candidates, target));
