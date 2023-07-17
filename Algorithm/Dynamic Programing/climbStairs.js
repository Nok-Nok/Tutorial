// Climbing Stairs

/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
 */

// Bottom up DP: go from 0 to n
// Time Complexity: O(n)
// Space Complexity: O(1)
function climbStairs(n) {
  let step1 = 1;
  let step2 = 0;
  for (let i = 1; i <= n; i++) {
    const temp = step1 + step2;
    // Update 1 prev step and 2 prev step
    step2 = step1;
    step1 = temp;
  }
  return step1;
}

// console.log(climbStairs(2));

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 3) return n;
  let prev = 1; //f(1)
  let cur = 2; //f(2)
  for (let i = 3; i <= n; i++) {
    // f(n+1) = f(n)+ f(n-1)
    const next = cur + prev;
    // update
    prev = cur;
    cur = next;
  }
  return cur;
};
